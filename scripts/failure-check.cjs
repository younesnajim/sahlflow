/*
 * Dev-only: upstream failure handling and the allowance refund.
 *   node scripts/failure-check.cjs <siteBase>
 * Expects the site pointed at a mock started in a failing mode.
 */
const site = process.argv[2] || "http://localhost:3112";
const expectRefund = process.argv[3] !== "no-refund";

let failures = 0;
function check(name, condition, detail = "") {
  if (!condition) failures++;
  console.log(`${condition ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

const post = (body) =>
  fetch(`${site}/api/demo`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (r) => ({ status: r.status, text: await r.text() }));

(async () => {
  const session = `fail-${Math.random().toString(36).slice(2)}`;

  const res = await post({ sessionId: session, scenario: "clinic", message: "hello" });
  check("upstream failure returns 500", res.status === 500, `status ${res.status}`);
  check("body is the neutral error", res.text.includes("demo_unavailable"), res.text.slice(0, 120));
  check(
    "no stack trace or upstream detail leaks",
    !/ {4}at |Error:|api\.openai|sk-|mock upstream/i.test(res.text),
    res.text.slice(0, 120),
  );

  if (expectRefund) {
    // Four more failures; if the turn were charged, the session would be spent.
    for (let i = 0; i < 4; i++) {
      await post({ sessionId: session, scenario: "clinic", message: `again ${i}` });
    }
    const after = await post({ sessionId: session, scenario: "clinic", message: "still here?" });
    check(
      "failed turns are refunded, not charged",
      after.status === 500,
      `status ${after.status} (429 would mean the visitor was charged for replies they never got)`,
    );
  }

  console.log(failures === 0 ? "\nall passed" : `\n${failures} failed`);
  process.exitCode = failures === 0 ? 0 : 1;
})();

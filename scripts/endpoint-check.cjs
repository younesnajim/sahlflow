/*
 * Dev-only: drives /api/demo against the mock and asserts on what was sent.
 *   node scripts/endpoint-check.cjs <siteBase> <captureFile>
 */
const fs = require("fs");

const site = process.argv[2] || "http://localhost:3112";
const captureFile = process.argv[3] || "mock-capture.json";

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
  }).then(async (r) => ({ status: r.status, json: await r.json().catch(() => null) }));

(async () => {
  const session = `check-${Math.random().toString(36).slice(2)}`;

  // Five brokerage turns: the fifth should come back as a lead card.
  let last;
  for (let i = 1; i <= 5; i++) {
    last = await post({ sessionId: session, scenario: "brokerage", message: `message ${i}` });
    if (last.status !== 200) {
      console.log(`turn ${i} failed:`, last.status, JSON.stringify(last.json));
      break;
    }
  }

  const captured = JSON.parse(fs.readFileSync(captureFile, "utf8"));
  const first = captured[0];
  const fifth = captured[4];

  check("model is gpt-4o-mini", captured.every((c) => c.model === "gpt-4o-mini"),
    [...new Set(captured.map((c) => c.model))].join(","));
  check("max_tokens is 300", captured.every((c) => c.max_tokens === 300),
    [...new Set(captured.map((c) => c.max_tokens))].join(","));
  check("api key sent", captured.every((c) => c.authorization === "present"));
  check("endpoint path", captured.every((c) => c.url === "/chat/completions"), first && first.url);

  // system prompt + user + the trailing per-request language directive
  check("turn 1 sends prompt, user, language directive",
    first && first.messages.length === 3,
    first && first.messages.map((m) => m.role).join(","));
  check("language directive is last and is a system message",
    first && first.messages[2].role === "system" &&
      /writing in English|يكتب بالعربية/.test(first.messages[2].content),
    first && first.messages[2].content.slice(0, 60));
  check("system prompt is the brokerage one",
    first && first.messages[0].role === "system" && first.messages[0].content.includes("عقارات المدى"));
  check("system prompt carries the appendices",
    first && first.messages[0].length > 951, first && `${first.messages[0].length} chars`);

  // prompt + four prior exchanges (8) + current user + directive = 11
  check("turn 5 replays the four prior exchanges",
    fifth && fifth.messages.length === 11,
    fifth && `${fifth.messages.length} messages: ` + fifth.messages.map((m) => m.role).join(","));
  check("replay alternates user/assistant",
    fifth && fifth.messages.slice(1, -1).every((m, i) => m.role === (i % 2 === 0 ? "user" : "assistant")));
  check("history never exceeds 10 replayed messages",
    captured.every((c) => c.messages.length - 3 <= 10),
    `max ${Math.max(...captured.map((c) => c.messages.length - 3))}`);
  const replayedAssistants = fifth ? fifth.messages.filter((m) => m.role === "assistant") : [];
  check("replayed assistant turns are the model's own text",
    replayedAssistants.length === 4 &&
      replayedAssistants.every((m, i) => m.content === `MOCK reply for turn ${i + 1}`),
    replayedAssistants.map((m) => m.content).join(" | "));

  check("fifth reply parsed into a card",
    last && last.json && last.json.card && last.json.card.rows.length === 7,
    last && last.json && last.json.card ? last.json.card.rows.map((r) => r.label).join(",") : "no card");
  check("card footer is the CRM line",
    last && last.json && last.json.card && /CRM/.test(last.json.card.footer || ""),
    last && last.json && last.json.card ? last.json.card.footer : "");
  check("conversational text kept separately",
    last && last.json && /Based on that/.test(last.json.reply || ""), last && last.json && last.json.reply);
  check("no <lead> markup leaks into the reply",
    last && last.json && !/<\/?lead>/.test(JSON.stringify(last.json)));

  // Sixth message must hit the per-session limit.
  const sixth = await post({ sessionId: session, scenario: "brokerage", message: "one more" });
  check("6th message hits the session limit", sixth.status === 429, `status ${sixth.status}`);

  console.log(failures === 0 ? "\nall passed" : `\n${failures} failed`);
  process.exitCode = failures === 0 ? 0 : 1;
})();

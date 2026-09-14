/* Dev-only: checks the demo endpoint answers in the language it was written in. */
const cases = [
  ["Arabic", "كم سعر الاستشارة؟"],
  ["Arabic short", "مرحبا"],
  ["English", "Hi, how much is a consultation?"],
  ["English short", "hello there"],
  ["Mixed (Arabic wins)", "hello مرحبا"],
];

const isArabic = (s) => [...s].some((c) => c.codePointAt(0) >= 0x0600 && c.codePointAt(0) <= 0x06ff);

(async () => {
  const base = process.argv[2] || "http://localhost:3111";
  let failures = 0;
  for (const [name, message] of cases) {
    const res = await fetch(`${base}/api/demo`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: `lang-${Math.random().toString(36).slice(2)}`,
        scenario: "clinic",
        message,
      }),
    });
    const data = await res.json();
    const want = isArabic(message) ? "ar" : "en";
    const got = isArabic(data.reply || "") ? "ar" : "en";
    const ok = want === got;
    if (!ok) failures++;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${name.padEnd(20)} sent=${want} got=${got}  ${String(data.reply).slice(0, 48)}`,
    );
  }
  console.log(failures === 0 ? "\nall passed" : `\n${failures} failed`);
  // exitCode, not process.exit: exiting with a fetch handle still open
  // trips a libuv assertion on Windows.
  process.exitCode = failures === 0 ? 0 : 1;
})();

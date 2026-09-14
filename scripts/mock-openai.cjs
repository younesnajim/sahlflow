/*
 * Dev-only mock of the OpenAI chat completions endpoint.
 *
 * Records every request it receives to a JSON file so tests can assert on the
 * model, max_tokens, and the exact message list sent — and replies with a
 * scripted answer, including a <lead> block on the fifth brokerage turn.
 *
 *   node scripts/mock-openai.cjs <port> <capture-file> [mode]
 *
 * mode: ok (default) | http500 | slow | empty
 */
const http = require("http");
const fs = require("fs");

const port = +(process.argv[2] || 4010);
const captureFile = process.argv[3] || "mock-capture.json";
const mode = process.argv[4] || "ok";

fs.writeFileSync(captureFile, "[]");

function reply(body) {
  const messages = body.messages || [];
  const turn = messages.filter((m) => m.role === "user").length;
  const system = messages.find((m) => m.role === "system");
  const brokerage = system && system.content.includes("عقارات المدى");

  if (brokerage && turn >= 5) {
    return [
      "Based on that, the two that fit best:",
      "",
      "<lead>",
      "Name: Abu Mohammed",
      "Purpose: Investment",
      "Budget: Up to AED 1,000,000",
      "Area: Open — prefers JVC",
      "Down payment: AED 200,000 in cash",
      "Handover: Two-year handover acceptable",
      "Location: Inside the UAE",
      "</lead>",
      "",
      "This reaches the team in the CRM within seconds.",
    ].join("\n");
  }
  return `MOCK reply for turn ${turn}`;
}

http
  .createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      let body = {};
      try {
        body = JSON.parse(raw);
      } catch {
        /* recorded as empty */
      }

      // Only real completion calls are recorded; readiness probes are not.
      if (req.method !== "POST" || !req.url.includes("/chat/completions") || !body.model) {
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({ ok: true }));
      }

      const captured = JSON.parse(fs.readFileSync(captureFile, "utf8"));
      captured.push({
        url: req.url,
        authorization: req.headers.authorization ? "present" : "missing",
        model: body.model,
        max_tokens: body.max_tokens,
        temperature: body.temperature,
        messages: (body.messages || []).map((m) => ({
          role: m.role,
          content: m.content.length > 120 ? m.content.slice(0, 120) + "…" : m.content,
          length: m.content.length,
        })),
      });
      fs.writeFileSync(captureFile, JSON.stringify(captured, null, 1));

      const send = () => {
        if (mode === "http500") {
          res.writeHead(500, { "content-type": "application/json" });
          return res.end(JSON.stringify({ error: { message: "mock upstream failure" } }));
        }
        if (mode === "empty") {
          res.writeHead(200, { "content-type": "application/json" });
          return res.end(JSON.stringify({ choices: [{ message: { content: "" } }] }));
        }
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ choices: [{ message: { role: "assistant", content: reply(body) } }] }),
        );
      };

      // `slow` outlives the client's 20s abort.
      if (mode === "slow") setTimeout(send, 25000);
      else send();
    });
  })
  .listen(port, () => console.log(`mock openai on ${port} (mode=${mode})`));

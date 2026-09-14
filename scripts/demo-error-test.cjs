/* Dev-only: forces /api/demo failures and checks the widget degrades calmly. */
const http = require("http");
const WebSocket = require("ws");

function req(method, path) {
  return new Promise((res, rej) => {
    const r = http.request({ host: "localhost", port: 9222, path, method }, (resp) => {
      let d = "";
      resp.on("data", (c) => (d += c));
      resp.on("end", () => res(JSON.parse(d)));
    });
    r.on("error", rej);
    r.end();
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const [url, mode] = process.argv.slice(2);
  const target = await req("PUT", "/json/new?about:blank");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (m, p) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method: m, params: p }));
    });
  ws.on("message", (m) => {
    const msg = JSON.parse(m);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  await new Promise((r) => ws.on("open", r));

  const evalJs = async (expression) => {
    const res = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails.exception));
    return res.result.value;
  };

  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.navigate", { url });
  await sleep(4000);

  const stub =
    mode === "reject"
      ? `window.fetch = () => Promise.reject(new Error('network down'));`
      : mode === "garbage"
        ? `window.fetch = () => Promise.resolve(new Response('<html>500 oops</html>', { status: 500 }));`
        : `window.fetch = () => Promise.resolve(new Response(JSON.stringify({ error: 'demo_unavailable' }), { status: 500, headers: { 'content-type': 'application/json' } }));`;
  await evalJs(`${stub} true`);

  await evalJs(`(() => {
    const input = document.querySelector('input[type=text], input:not([type])');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, 'مرحبا');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.closest('form').requestSubmit();
    return true;
  })()`);
  await sleep(1200);

  const out = await evalJs(`(() => {
    const text = document.body.innerText;
    const bubbles = [...document.querySelectorAll('[aria-live=polite] > div')].map(d => d.textContent.trim());
    return JSON.stringify({
      mode: ${JSON.stringify(mode)},
      lastBubble: bubbles[bubbles.length - 1] || null,
      composerStillUsable: !!document.querySelector('input[type=text], input:not([type])'),
      leakedStackTrace: /at\\s+\\w+\\s+\\(|Error:|TypeError|<html>|demo_unavailable/.test(text)
    });
  })()`);
  console.log(out);
  ws.close();
}
main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

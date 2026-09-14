/* Dev-only: drives the demo widget through its full lifecycle via CDP. */
const http = require("http");
const fs = require("fs");
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
  const [url, width, shotDir] = process.argv.slice(2);
  const target = await req("PUT", "/json/new?about:blank");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
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

  const shot = async (name) => {
    if (!shotDir) return;
    const metrics = await send("Page.getLayoutMetrics");
    const s = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: +width, height: Math.min(Math.ceil(metrics.cssContentSize.height), 1100), scale: 1 },
    });
    fs.writeFileSync(`${shotDir}/${name}.png`, Buffer.from(s.data, "base64"));
  };

  await send("Emulation.setDeviceMetricsOverride", { width: +width, height: 1000, deviceScaleFactor: 2, mobile: +width < 700 });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(4000);

  // React ignores programmatic .value writes, so set it through the native setter.
  const typeAndSend = async (text) => {
    await evalJs(`(() => {
      const input = document.querySelector('input[type=text], input:not([type])');
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${JSON.stringify(text)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.closest('form').requestSubmit();
      return true;
    })()`);
    await sleep(900);
  };

  const state = () =>
    evalJs(`(() => {
      const bubbles = [...document.querySelectorAll('[aria-live=polite] > div')].map(d => d.textContent.trim());
      const composer = document.querySelector('input[type=text], input:not([type])');
      const limitHeading = [...document.querySelectorAll('p')].map(p => p.textContent.trim())
        .find(t => t.includes('خلّنا نبني') || t.includes("Let's build you one"));
      const counter = [...document.querySelectorAll('p')].map(p => p.textContent.trim())
        .find(t => t.includes('المتبقية') || t.includes('Messages left'));
      return JSON.stringify({ bubbles, hasComposer: !!composer, limitHeading: limitHeading || null, counter: counter || null });
    })()`);

  console.log("initial:", await state());

  // Tab switch must reset the transcript.
  await evalJs(`[...document.querySelectorAll('[role=tab]')][1].click(); true`);
  await sleep(600);
  console.log("after tab switch:", await state());
  await evalJs(`[...document.querySelectorAll('[role=tab]')][0].click(); true`);
  await sleep(600);

  for (let i = 1; i <= 6; i++) {
    const st = JSON.parse(await state());
    if (!st.hasComposer) break; // limit reached; composer is gone
    await typeAndSend(`رسالة اختبار ${i}`);
    console.log(`after msg ${i}:`, await state());
  }
  await shot("demo-limited");
  console.log("final:", await state());

  ws.close();
}
main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

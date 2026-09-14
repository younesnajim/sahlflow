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
  const [url, width, shotDir, tabIndex, msgLang, scripted] = process.argv.slice(2);
  // A real qualification flow needs real answers; pass them as "a|b|c".
  const scriptedMessages = scripted ? scripted.split("|") : null;
  // A live model takes seconds, not milliseconds; the stub was fine at 900ms.
  const replyWait = scriptedMessages ? 9000 : 900;
  // The agent mirrors the visitor's language, so the test has to choose one.
  const probe = msgLang === "en" ? "test message" : "رسالة اختبار";
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
    await sleep(replyWait);
  };

  const state = () =>
    evalJs(`(() => {
      const nodes = [...document.querySelectorAll('[aria-live=polite] > div')];
      const bubbles = nodes.map(d => (d.querySelector('dl') ? 'LEADCARD[' + [...d.querySelectorAll('dt')].map(t => t.textContent.trim()).join(',') + ']' : d.textContent.trim()));
      const composer = document.querySelector('input[type=text], input:not([type])');
      const limitHeading = [...document.querySelectorAll('p')].map(p => p.textContent.trim())
        .find(t => t.includes('خلّنا نبني') || t.includes("Let's build you one"));
      const counter = [...document.querySelectorAll('p')].map(p => p.textContent.trim())
        .find(t => t.includes('المتبقية') || t.includes('Messages left'));
      return JSON.stringify({ bubbles, hasComposer: !!composer, limitHeading: limitHeading || null, counter: counter || null });
    })()`);

  console.log("initial:", await state());

  const tab = tabIndex ? +tabIndex : 0;
  if (tab !== 0) {
    await evalJs("[...document.querySelectorAll('[role=tab]')][" + tab + "].click(); true");
    await sleep(700);
    console.log("after tab switch:", await state());
  }

  const turns = scriptedMessages ? scriptedMessages.length : 6;
  for (let i = 1; i <= turns; i++) {
    const st = JSON.parse(await state());
    if (!st.hasComposer) break; // limit reached; composer is gone
    await typeAndSend(scriptedMessages ? scriptedMessages[i - 1] : probe + " " + i);
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

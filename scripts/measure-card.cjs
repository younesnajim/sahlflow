const http = require("http");
const WebSocket = require("ws");
function req(m, p) { return new Promise((res, rej) => { const r = http.request({ host: "localhost", port: 9222, path: p, method: m }, (x) => { let d = ""; x.on("data", c => d += c); x.on("end", () => res(JSON.parse(d))); }); r.on("error", rej); r.end(); }); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const t = await req("PUT", "/json/new?about:blank");
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  let id = 0; const pend = new Map();
  const send = (m, p) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  ws.on("message", m => { const o = JSON.parse(m); if (o.id && pend.has(o.id)) { pend.get(o.id)(o.result); pend.delete(o.id); } });
  await new Promise(r => ws.on("open", r));
  const ev = async e => (await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result.value;
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Page.navigate", { url: process.argv[2] });
  await sleep(4000);
  await ev("[...document.querySelectorAll('[role=tab]')][1].click(); true");
  await sleep(700);
  for (let i = 0; i < 5; i++) {
    await ev(`(() => { const inp = document.querySelector('input[type=text], input:not([type])'); if (!inp) return false; const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set; s.call(inp,'م${i}'); inp.dispatchEvent(new Event('input',{bubbles:true})); inp.closest('form').requestSubmit(); return true; })()`);
    await sleep(800);
  }
  console.log(await ev(`(() => {
    const box = document.querySelector('[aria-live=polite]');
    const card = box.querySelector('dl') ? box.querySelector('dl').closest('div.w-full') : null;
    const cs = card && getComputedStyle(card);
    return JSON.stringify({
      scrollTop: box.scrollTop, scrollHeight: box.scrollHeight, clientHeight: box.clientHeight,
      atBottom: Math.abs(box.scrollTop + box.clientHeight - box.scrollHeight) < 2,
      cardHeight: card ? Math.round(card.getBoundingClientRect().height) : null,
      cardScrollHeight: card ? card.scrollHeight : null,
      flexShrink: cs ? cs.flexShrink : null
    });
  })()`));
  ws.close();
})();

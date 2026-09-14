/* Dev-only helper: exact-viewport full-page screenshots + overflow probe via CDP. */
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

async function main() {
  const [url, width, out, yArg, hArg] = process.argv.slice(2);
  const y = yArg ? +yArg : 0;
  const forcedH = hArg ? +hArg : 0;
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

  await send("Emulation.setDeviceMetricsOverride", {
    width: +width,
    height: 900,
    deviceScaleFactor: 2,
    mobile: +width < 700,
  });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 4500));

  const probe = await send("Runtime.evaluate", {
    expression: `(() => {
      const w = document.documentElement.clientWidth;
      const out = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        if (r.right > w + 1 || r.left < -1) {
          const cls = (el.className && el.className.baseVal !== undefined) ? el.className.baseVal : (el.className || '');
          out.push(el.tagName.toLowerCase() + ' [' + String(cls).slice(0,70) + '] left=' + Math.round(r.left) + ' right=' + Math.round(r.right));
        }
      });
      return JSON.stringify({ viewport: w, scrollWidth: document.documentElement.scrollWidth, dir: document.documentElement.dir, offenders: out.slice(0,15) });
    })()`,
    returnByValue: true,
  });
  console.log(probe.result.value);

  const metrics = await send("Page.getLayoutMetrics");
  const total = Math.ceil(metrics.cssContentSize.height);
  const h = forcedH || Math.min(total - y, 16000);
  console.log("page height", total);
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y, width: +width, height: h, scale: 1 },
  });
  fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log("wrote", out, width + "x" + h);

  await send("Target.closeTarget", { targetId: target.id }).catch(() => {});
  ws.close();
}
main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

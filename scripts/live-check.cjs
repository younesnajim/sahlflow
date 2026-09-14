/*
 * Dev-only: runs real conversations against the live endpoint and prints them.
 *   node scripts/live-check.cjs <siteBase> <scenario> <msg1> <msg2> ...
 */
const site = process.argv[2];
const scenario = process.argv[3];
const messages = process.argv.slice(4);

(async () => {
  const session = `live-${Math.random().toString(36).slice(2)}`;
  for (const message of messages) {
    const res = await fetch(`${site}/api/demo`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: session, scenario, message }),
    });
    const data = await res.json().catch(() => null);
    console.log(`\n>> ${message}`);
    if (res.status !== 200) {
      console.log(`   [${res.status}] ${JSON.stringify(data)}`);
      break;
    }
    if (data.reply) console.log(`<< ${data.reply}`);
    if (data.card) {
      console.log("<< [LEAD CARD]");
      for (const row of data.card.rows) console.log(`     ${row.label}: ${row.value}`);
      if (data.card.footer) console.log(`     footer: ${data.card.footer}`);
    }
    if (data.trailing) console.log(`<< ${data.trailing}`);
    console.log(`   (remaining ${data.remaining})`);
  }
})();

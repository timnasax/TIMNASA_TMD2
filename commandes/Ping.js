const { zokou } = require("../framework/zokou");

zokou({
  name: "ping",
  alias: ["p"],
  category: "General",
  reaction: "⚡"
}, async (dest, zk, reponce) => {
  const start = Date.now();
  const { ms } = reponce;
  
  const { key } = await zk.sendMessage(dest, { text: "Checking Latency... 📡" }, { quoted: ms });
  const end = Date.now();
  
  await zk.sendMessage(dest, {
    text: `*Verified Response:* 🚀 ${end - start}ms`,
    edit: key
  });
});

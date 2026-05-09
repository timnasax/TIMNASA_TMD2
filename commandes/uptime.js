const { zokou } = require("../framework/zokou");

zokou({
  name: "uptime",
  category: "General",
  reaction: "⏳"
}, async (dest, zk, reponce) => {
  const { ms } = reponce;
  
  const seconds = process.uptime();
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const uptimeStr = `╭━━〔 *SYSTEM STATUS* 〕━━┈⊷\n┃ ⚡ *Uptime:* ${h}h ${m}m ${s}s\n┃ ✅ *Verified:* Yes\n┃ 🔒 *Secure:* Active\n╰━━━━━━━━━━━━━━━━━━┈⊷`;

  await zk.sendMessage(dest, { text: uptimeStr }, { quoted: ms });
});

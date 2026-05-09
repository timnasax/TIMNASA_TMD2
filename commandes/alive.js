const { zokou } = require("../framework/zokou");
const { conf } = require("../set");

zokou({
  name: "alive",
  category: "General",
  reaction: "🟢"
}, async (dest, zk, reponce) => {
  const { ms, pushName } = reponce;

  const aliveMsg = `*TIMNASA-TXMD IS ACTIVE* ✔️\n\nHello ${pushName},\n\nI am currently running and stable. 🚀\n\n*Owner:* ${conf.OWNER_NAME}\n*Status:* Verified Bot\n\n_Type .menu for my command list._`;

  await zk.sendMessage(dest, {
    image: { url: "https://telegra.ph/file/8bc900f074d0928e46123.jpg" },
    caption: aliveMsg,
    contextInfo: {
      externalAdReply: {
        title: "TIMNASA-TXMD VERIFIED 🌐",
        body: "Official System Status",
        thumbnailUrl: "https://telegra.ph/file/8bc900f074d0928e46123.jpg",
        sourceUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true // This adds the "Official" tag
      }
    }
  }, { quoted: ms });
});

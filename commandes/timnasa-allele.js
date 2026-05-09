const axios = require("axios");
const { zokou } = require("../framework/zokou");

// --- UTILS ---
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}

// --- ALLDL COMMAND ---
zokou({
  name: "alldl",
  alias: ["alldown", "dl", "download"],
  category: "Download",
  reaction: "📥"
}, async (dest, zk, reponce) => {
  const { ms, args, reply } = reponce;
  if (!args[0]) return reply("Please provide a URL to download from.");
  
  const url = args.join(" ");
  try {
    const res = await axios.get(`https://www.noobs-api.rf.gd/dipto/alldl?url=${encodeURIComponent(url)}`);
    const data = res.data;

    if (data.result) {
      const isImage = data.result.endsWith(".jpg") || data.result.endsWith(".png");
      const mediaProp = isImage ? { image: { url: data.result } } : { video: { url: data.result } };

      await zk.sendMessage(dest, {
        ...mediaProp,
        caption: "*TIMNASA-TXMD BOT*",
        contextInfo: {
          externalAdReply: {
            title: "TIMNASA-TXMD V2 - Media Downloader",
            body: "Fast & Reliable",
            mediaType: 1,
            thumbnailUrl: data.imageUrl || '',
            sourceUrl: url,
            showAdAttribution: true
          }
        }
      }, { quoted: ms });
      
      reply("YOUR Download is complete!");
    } else {
      reply("No media found or invalid URL provided.");
    }
  } catch (e) {
    reply("An error occurred while processing the request.");
  }
});

// --- TIKTOK COMMAND ---
zokou({
  name: "tiktok",
  alias: ["tik", "tok", "tikdl"],
  category: "Download",
  reaction: "🎥"
}, async (dest, zk, reponce) => {
  const { ms, args, reply } = reponce;
  const url = args.join(" ");
  if (!url) return reply("Please insert a TikTok video link!");

  try {
    reply("A moment, *TIMNASA-TXMD* is downloading...");
    const res = await axios.get(`https://bk9.fun/download/tiktok?url=${encodeURIComponent(url)}`);
    const data = res.data;

    if (!data.status || !data.BK9) return reply("Failed to retrieve video.");

    await zk.sendMessage(dest, {
      video: { url: data.BK9.BK9 },
      caption: `*CAPTION:* ${data.BK9.desc || "TikTok Video"}\n\n╰► 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐛𝐲 *TIMNASA-TXMD*`,
      contextInfo: {
        externalAdReply: {
          title: "FLASH-MD TikTok Downloader",
          body: "POWERED BY TMNASA TIMOTH",
          thumbnailUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });
  } catch (e) {
    reply("Error occurred. Try again later.");
  }
});

// --- REPO COMMAND ---
zokou({
  name: "repo",
  alias: ["sc", "script"],
  category: "General"
}, async (dest, zk, reponce) => {
  const { ms } = reponce;
  try {
    const res = await axios.get('https://api.github.com/repos/Next5x/Timnasa-Txmd');
    const data = res.data;

    const msg = `*HEY 👋 THIS IS TIMNASA-TXMD.*\n\n` +
      `[✨] *STARS*: ${data.stargazers_count}\n` +
      `[🧧] *FORKS*: ${data.forks_count}\n` +
      `[📅] *RELEASED*: ${new Date(data.created_at).toLocaleDateString()}\n` +
      `[🗼] *REPO*: ${data.html_url}\n` +
      `[👨‍💻] *OWNER*: Timoth Timnasa\n\n*Made With* 🤍`;

    await zk.sendMessage(dest, {
      text: msg,
      contextInfo: {
        externalAdReply: {
          title: "THE TIMNASA MULTI DEVICE",
          body: "POWERED BY TMNASA TIMOTH",
          thumbnailUrl: 'https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31',
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (e) {
    reponce.reply("Error fetching repo data.");
  }
});

// --- APK COMMAND ---
zokou({
  name: "apk",
  alias: ["app"],
  category: "Download"
}, async (dest, zk, reponce) => {
  const { ms, args, reply } = reponce;
  if (!args[0]) return reply("Please provide a search query for APKs");

  try {
    reply("🔍 Searching, A moment...");
    const searchRes = await axios.get(`https://bk9.fun/search/apk?q=${encodeURIComponent(args.join(" "))}`);
    if (!searchRes.data.BK9[0]) return reply("No APKs found.");

    const app = searchRes.data.BK9[0];
    const dlRes = await axios.get(`https://bk9.fun/download/apk?id=${app.id}`);
    const dlLink = dlRes.data.BK9.dllink;

    await zk.sendMessage(dest, {
      document: { url: dlLink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${app.name}.apk`,
      caption: `- *TIMNASA-TXMD APP DOWNLOADER*\n\n- *App Name:* ${app.name}`
    }, { quoted: ms });
  } catch (e) {
    reply("Error processing APK request.");
  }
});

const { zokou } = require("../framework/zokou");

zokou({
  name: "broadcastch",
  alias: ["bcch", "postch"],
  category: "Owner",
  reaction: "📢"
}, async (dest, zk, reponce) => {
  const { ms, reply, isCreator, args } = reponce;

  // 1. Hakikisha ni Owner pekee anayetumia
  if (!isCreator) return reply("Access Denied! Only my Owner can use this. ✔️");

  // 2. Hakikisha kuna ujumbe wa kutuma
  if (!args[0]) return reply("Please provide a message or text to post to your channels.");

  const messageToPost = args.join(" ");

  try {
    reply("📡 Fetching your channels... Please wait.");

    // 3. Pata orodha ya channels (newsletters)
    const newsletters = await zk.newsletterList();

    if (!newsletters || newsletters.length === 0) {
      return reply("You don't seem to be a member of any channels. ❌");
    }

    let postCount = 0;

    for (const channel of newsletters) {
      // 4. Angalia kama wewe ni Admin au Owner wa hiyo channel
      const role = channel.viewer_metadata?.role;
      
      if (role === 'admin' || role === 'owner') {
        
        // 5. Tuma ujumbe kwenye channel husika
        await zk.sendMessage(channel.id, { 
            text: messageToPost,
            contextInfo: {
                externalAdReply: {
                    title: "TIMNASA-TXMD OFFICIAL POST ✔️",
                    body: "Verified Broadcast System",
                    mediaType: 1,
                    sourceUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
                    showAdAttribution: true
                }
            }
        });

        postCount++;
        
        // 6. Pause kidogo ili kulinda namba isipate ban (Rate limiting)
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    if (postCount > 0) {
      await zk.sendMessage(dest, { 
        text: `✅ *BROADCAST COMPLETE* \n\nSuccessfully posted to ${postCount} channels where you are an Admin.` 
      }, { quoted: ms });
    } else {
      reply("I couldn't find any channels where you have Admin/Owner permissions. 🔍");
    }

  } catch (e) {
    console.log("Error in broadcastch:", e);
    reply("An error occurred. Make sure your bot framework is updated to support Newsletters.");
  }
});

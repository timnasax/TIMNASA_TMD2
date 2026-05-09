const { zokou } = require("../framework/zokou");

zokou({
  name: "unfollowall",
  category: "Owner",
  reaction: "🚫"
}, async (dest, zk, reponce) => {
  const { ms, reply, isCreator } = reponce;

  // Hakikisha ni mmiliki tu wa bot anayetumia amri hii
  if (!isCreator) return reply("This command is only for my Owner! ✔️");

  try {
    reply("🔍 Scanning followed channels... Please wait.");

    // Pata orodha ya newsletters/channels zote
    const newsletters = await zk.newsletterList();

    if (!newsletters || newsletters.length === 0) {
      return reply("You are not following any channels at the moment. ✅");
    }

    let unfollowCount = 0;

    for (const channel of newsletters) {
      // Angalia kama wewe ni admin (role: 'admin' au 'owner')
      // Ikiwa role ni 'guest' au 'subscriber', bot itajitoa
      if (channel.viewer_metadata?.role !== 'admin' && channel.viewer_metadata?.role !== 'owner') {
        
        await zk.newsletterUnsubscribe(channel.id);
        unfollowCount++;
        
        // Tunapumzika kidogo ili kuzuia WhatsApp kuzuia (ban) bot kwa haraka sana
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (unfollowCount > 0) {
      await zk.sendMessage(dest, { 
        text: `✅ *TIMNASA-TXMD VERIFIED* \n\nSuccessfully unfollowed ${unfollowCount} channels where you were not an admin.` 
      }, { quoted: ms });
    } else {
      reply("You are already an admin in all channels you follow! ✨");
    }

  } catch (e) {
    console.log("Error in unfollowall:", e);
    reply("Failed to process the request. Some framework versions might not support newsletter management.");
  }
});

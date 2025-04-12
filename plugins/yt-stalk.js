const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "ytstalk",
  alias: ["ytinfo"],
  desc: "Get details about a YouTube channel.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid YouTube channel username or ID.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch YouTube channel details. Ensure the username or ID is correct.");
    }

    const yt = data.data;
    const caption = `╭━━━〔 *YOUTUBE STALKER* 〕━━━⊷\n`
      + `┃👤 *Username:* ${yt.username}\n`
      + `┃📊 *Subscribers:* ${yt.subscriber_count}\n`
      + `┃🎥 *Videos:* ${yt.video_count}\n`
      + `┃🔗 *Channel Link:* (${yt.channel})\n`
      + `╰━━━⪼\n\n`
      + `🔹 *Powered by DavidTechX*`;

    await conn.sendMessage(from, {
      image: { url: yt.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});

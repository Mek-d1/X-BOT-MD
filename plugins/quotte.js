const axios = require('axios');
const { fetchJson } = require('../lib/functions')
const { cmd } = require('../command');

cmd({
    pattern: "quote",
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const response = await axios.get('https://favqs.com/api/qotd');
        const quote = response.data.quote;
        const message = `
💬 "${quote.body}"
- ${quote.author}
*QUOTES BY X-BOT MD*
        `;
        return reply(message);
    } catch (e) {
        console.error("Error fetching quote:", e);
        reply("¢συℓ∂ ησт ƒєт¢н α qυσтє. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});
cmd({
    pattern: "tiny",
    alias: ["short"], 
    react: "😐",
    desc: "to shorten Links",
    category: "random",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://tinyurl.com/api-create.php?url=${q}`)
return reply(` ~here's your shortened Link~ *${data}*`)
}catch(e){
console.log(e)
reply(`${e}`)
}
});
cmd({
  pattern: "ss",
  alias: ["ssweb"],
  react: "👽",
  desc: "Download screenshot of a given link.",
  category: "tools",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("Please provide a URL to capture a screenshot.");
  }

  try {
    // created by Davidx 
    const response = await axios.get(`https://api.davidcyriltech.my.id/ssweb?url=${q}`);
    const screenshotUrl = response.data.screenshotUrl;

    // make sure to give credit ya
    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*HERE'S YOUR SCREENSHOT*\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363348038810906@newsletter',
          newsletterName: "X-ʙᴏᴛ-ᴍᴅ",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("Failed to capture the screenshot. Please try again.");
  }
});
    

const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "aza",
    alias: ["account"],
    react: '💲',
    desc: "show account number .",
    category: "owner",
    use: '.aza',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = "https://i.imgur.com/rzPIk3t.jpeg"
let wm = ` 9133354644, David promise, (Opay), ~send ss after payment~

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*`
await conn.sendMessage(from, { image: { url: res }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
cmd({
    pattern: "cc",
    alias: ["vcc"],
    react: '💳',
    desc: "get random cc.",
    category: "random",
    use: '.vcc',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const response = await axios.get('https://itzpire.com/random/vcc?cardType=MasterCard');
        const vc = response.data.data;
        const message = `
 *[ •  RAMDOM - CARDS‎ • ]*  
 
 *╭┈───────────────•*
 *│  ◦* *DATA* 
${vc}    
 *╰┈───────────────•*
 
  *•────────────•⟢* \n  © *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*
  *•────────────•⟢*`;
        return reply(message);
    } catch (e) {
        console.error("Error fetching cc:", e);
        reply("unable to fetch random credit card, please try again later.");
    }
})

cmd({
    pattern: "tiny2",
    alias: ["tny2"],
    desc: "short link with alias",
    react: "⚡",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("Please provide a link to shorten and a new name. Usage: .tiny2 [link] [text]");

        const link = args[0];
        const alias = args.slice(1).join(' ');

        const url = `https://api-fix.onrender.com/api/linkshort/tinyurlwithalias?link=${encodeURIComponent(link)}&alias=${alias}`;

        const response = await axios.get(url);
        const nlink = response.data.result;

        const linkyMes = `
╭┈───────────────•
│ *[ • TINY - W - ALIAS • ]*
╰┈───────────────•
╭┈───────────────•
│  ◦ *Original*: ${link}
│  ◦ 
│  ◦ *New link*: ${nlink}
╰┈───────────────•

*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx 
*•────────────•⟢*
`;

        return reply(linkyMes);
    } catch (e) {
        console.log(e);
        return reply("there's an error madafoka");
    }
})

cmd({
    pattern: "meme",
    alias: ["rmeme"],
    react: '🧧',
    desc: "Download random funny mrme images.",
    category: "anime",
    use: '.meme',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.popcat.xyz/meme')
let wm = `
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ x-ʙᴏᴛ-ᴍᴅ..*`
await conn.sendMessage(from, { image: { url: res.data.content.image }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})



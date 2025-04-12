const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
const axios = require('axios')
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "process denied."


cmd({
    pattern: "pooh",
    react: '🧧',
    desc: "Download pooh images.",
    category: "fun",
    use: '.pooh',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const args = q.split(',');
        if (args.length < 2) return reply("Please provide a language code and text. Usage: .poo text1,text2");

        const text1 = args[0];
        const text2 = args.slice(1).join(' ');
        
const apiUrl = `https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`
let wm = `
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*`
await conn.sendMessage(from, { image: { url: apiUrl }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

cmd({
    pattern: "drake",
    react: '🧧',
    desc: "Download pooh images.",
    category: "fun",
    use: '.drake',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const args = q.split(',');
        if (args.length < 2) return reply("Please provide a language code and text. Usage: .drake text1,text2");

        const text1 = args[0];
        const text2 = args.slice(1).join(' ');
        
const apiUrl = `https://api.popcat.xyz/drake?text1=${text1}&text2=${text2}`
let wm = `
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*`
await conn.sendMessage(from, { image: { url: apiUrl }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
  

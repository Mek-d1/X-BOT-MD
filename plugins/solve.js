const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "solve",
    alias: ["calc"], 
    react: "➗",
    desc: "calculator...",
    category: "tools",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply("Provide an expression eg .solve 5+3.")
let data = await fetchJson(`https://xstro-api-4fb28ece11a9.herokuapp.com/api/solveMath?expression=${q}`)
return reply(`*THAT'S* = ${data.result}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})
cmd({
    pattern: "pdel",
    react: "⛔",
    alias: [","],
    desc: "delete message",
    category: "group",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const key = {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                }
                await conn.sendMessage(m.chat, { delete: key })
} catch (e) {
reply('*Error !!*')
l(e)
}
})


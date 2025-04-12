


const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "menu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
fun: '',
ai: '',
anime: '',
owner: '',
hentai: '',
tools: '',
logo: '',
utility: '',
other: '',
random: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*☞* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `*╭─────────────────❒⁠⁠⁠⁠*

⇆ ʜɪ ᴛʜᴇʀᴇ, *${pushname}* ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ x-ʙᴏᴛ-ᴍᴅ ғᴜʟʟ ᴄᴍᴅ ʟɪsᴛ, ᴍᴏʀᴇ ᴄᴍᴅs ᴄᴏᴍɪɴɢ sᴏᴏɴ😊 ⇆

 
*┕─────────────────❒*

┏━━━━━━━━━━━━━━━━━━━━━━━━━━
   *x-ʙᴏᴛ-ᴍᴅ ғᴜʟʟ ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ*
┗━━━━━━━━━━━━━━━━━━━━━━━━━━

*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*


*╭───────────────❒⁠⁠⁠⁠*
 │ *Mek-d1/X-BOT-MD*
*┕───────────────❒*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴀɪ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.ai}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ғᴜɴ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.fun}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴀɴɪᴍᴇ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.anime}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴏᴛʜᴇʀ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.other}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴜᴛɪʟɪᴛʏ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.utility}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.download}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ʀᴀɴᴅᴏᴍ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.random}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.main}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.group}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ʜᴇɴᴛᴀɪ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.hentai}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴛᴏᴏʟs ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.tools}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞(⁠｡⁠◕⁠‿⁠◕⁠｡⁠)⁠➜ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.logo}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.owner}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *☞ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕───────────────❒*
*╭──────────●●►*
${menu.convert}
*╰──────────●●►*

*╭─────────────────❒⁠⁠⁠⁠*
*│* *☞sᴇᴀʀᴄʜ ᴄᴏᴍᴍᴀɴᴅs☜⁠ *
*┕─────────────────❒*
*╭──────────●●►*
${menu.search}
*╰──────────●●►*

*❒⁠⁠⁠⁠▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭❒*⁠⁠⁠⁠

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx*

╰━❁ ═══ ❃•⇆•❃ ═══ ❁━╯
`

await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/c1ji5s.jpg` },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363348038810906@newsletter',
                        newsletterName: 'x-ʙᴏᴛ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://raw.githubusercontent.com/Mek-d1/X-DATABASE/refs/heads/main/VOICE-DATA/xbot-menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


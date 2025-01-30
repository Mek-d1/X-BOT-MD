const config = require('../config');
const { cmd, commands } = require('../command');
const { default: makeWASocket, useMultiFileAuthState, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')
cmd({
    pattern: "tagall",
    desc: "Mention all group members.",
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!isOwner) return reply(` rserved for owner`);
        if (!groupAdmins) return reply(` admin cmd dude`);
        const groupMetadata = await conn.groupMetadata(from);
        const members = groupMetadata.participants.map(participant => `> ☞ @${participant.id.split('@')[0]}`).join('\n');
        const mentions = groupMetadata.participants.map(p => p.id);
        
        return await conn.sendMessage(from, {
            text: `~TAGGED BY~ *${pushname}*\n\n*REASON?*:${q}\n\n${members}`,
            mentions
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply(`Error: ${e.message}`);
    }
});

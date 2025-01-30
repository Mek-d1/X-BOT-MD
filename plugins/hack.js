const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            ' *HACK STARTING...* ',
            '',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '',
                       "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
            '',
            ' *System Breach: Successful!* ',
            '*Satellite X ready to receive data!*',
            '',
            '*Transmitting data...*',
            '*Sent data to Xmd database*',
            '*const phone data* = Agjwknbtcb518&@&$() ',
            '',
            'User info stored and ready to be accessed.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '',
            '> *X-BOT-MD-HACKING-COMPLETE ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
      

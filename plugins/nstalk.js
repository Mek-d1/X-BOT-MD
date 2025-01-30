const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "tikstalk",
    desc: "Fetch detailed tiktok user profile including profile picture.",
    category: "logo",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a Tiktok username.");
        }
        const apiUrl = `https://api.davidcyriltech.my.id/tiktokStalk?q=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *Username*: ${data.username}
🔗 *Name*:(${data.name})
📝 *Bio*: ${data.bio || 'Not available'}
👥 *Followers*: ${data.followers} | Following: ${data.following}
🤔 *Description*: ${data.description}
🔭 *Likes*: ${data.likes}
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.profile },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});

// davidx Tech, give credit y'all 
          

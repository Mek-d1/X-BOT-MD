const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "enter your session",
    CAPTION: process.env.CAPTION || "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ x-ʙᴏᴛ-ᴍᴅ",
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log",
AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto like or react on status
    READ_MESSAGE:process.env.READ_MESSAGE || "false", // Added auto-read configuration
    MODE: process.env.MODE || "private",
    AUTO_VOICE: process.env.AUTO_VOICE || "false",
    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    AUTO_REPLY: process.env.AUTO_REPLY || "true",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://i.imgur.com/rzPIk3t.jpeg",
    ALIVE_MSG: process.env.ALIVE_MSG || "ʜɪ ᴛʜᴇʀᴇ, ɪ'ᴍ ᴀᴄᴛɪᴠᴇ ʀɪɢʜᴛ ɴᴏᴡ, ᴀɴʏ ɴᴇᴡs?",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    ANTI_BAD: process.env.ANTI_BAD || "true",
    DELETE_LINKS: process.env.DELETE_LINKS || "true",
    PREFIX: process.env.PREFIX || ".",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    READ_CMD: process.env.READ_CMD || "true",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false", 
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    OWNER_REACT: process.env.OWNER_REACT || "true",
    BOT_NAME: process.env.BOT_NAME || "⁠➜x-ʙᴏᴛ-ᴍᴅ",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "`sᴛᴀᴛᴜs sᴜᴄᴄᴇssғᴜʟʟʏ ᴠɪᴇᴡᴇᴅ ʙʏ x-ʙᴏᴛ-ᴍᴅ`",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};

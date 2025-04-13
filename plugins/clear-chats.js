const { cmd } = require('../command');

cmd({
    pattern: "clear",
    alias: ["c", "deletechat"],
    desc: "Clear current chat messages",
    category: "owner",
    react: "🗑️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isOwner, reply }) => {
    try {
        if (!isOwner) {
            return reply("❌ This command is only for the owner!");
        }

        const chatType = isGroup ? "Group" : "Chat";
        await conn.modifyChat(from, "clear");
        await reply(`✅ ${chatType} cleared successfully!`);

    } catch (e) {
        console.error("Error in clear command:", e);
        reply(`❌ Failed to clear chat: ${e.message}`);
    }
});
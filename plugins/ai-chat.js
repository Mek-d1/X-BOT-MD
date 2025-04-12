const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "oai",
    alias: ["gpt"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.oai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`🤖 *AI Response:*\n\n${data.message}`);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

cmd({
    pattern: "aayo",
    alias: ["aayon"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for aayo.\nExample: `.aayo Who's naruto`");

        const apiUrl = `https://bk9.fun/ai/Aoyo?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.BK9) {
            await react("❌");
            return reply("aayo failed to respond. Please try again later.");
        }

        await reply(`🧠 *aayo Response:*\n\n${data.BK9}`);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with aayo.");
    }
});

cmd({
    pattern: "blackbox",
    alias: ["blk", "bbx"],
    desc: "Chat with Blackbox AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Blackboc AI.\nExample: `.Blackbox Hello`");

        const apiUrl = `https://api.davidcyriltech.my.id/blackbox?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.response) {
            await react("❌");
            return reply("Blackbox AI failed to respond. Please try again later.");
        }

        await reply(`🧠 *Blackbox AI Response:*\n\n${data.response}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});



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
    pattern: "deepseek",
    alias: ["dipsik", "deep"],
    desc: "Chat with deepseek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Deepseek AI.\nExample: `.Deepseek Hello`");

        const apiUrl = `https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.response) {
            await react("❌");
            return reply("Deepseek AI failed to respond. Please try again later.");
        }

        await reply(`🧠 *Deepseek AI Response:*\n\n${data.response}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});



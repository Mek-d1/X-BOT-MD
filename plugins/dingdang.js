const axios = require("axios");
const { cmd, commands } = require("../command");

cmd({
    pattern: "rgtn",
    alias: ["ringtone"],
    desc: "Get a random ringtone from the API.",
    react: "🎵",
    category: "tools",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("Usage Example .rgtn nokia");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("No ringtones found for your query. Please try a different keyword.");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error in ringtone command:", error);
        reply(`An error occurred ${e}`);
    }
});

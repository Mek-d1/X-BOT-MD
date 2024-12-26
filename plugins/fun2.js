const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "rizz",
    desc: "Get a random pickup line",
    react: "🫠",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://api.popcat.xyz/pickuplines';  // API for random rizz
        const response = await axios.get(url);
        const pickupline = response.data;

        const message = `
  *X-BOT-MD RANDOM PICKUPLINE*

${pickupline}


`;

        return reply(message);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching pickupline. Please try again later🤕.");
    }
});
cmd({
    pattern: "question",
    desc: "Get a random question",
    react: "🤔",
    category: "random",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://opentdb.com/api.php?amount=1&type=multiple';  // API for random question 
        const response = await axios.get(url);
        const question = data.results[0].question;

        const qmessage = `
  *X-BOT-MD RANDOM QUESTION*

${question}


`;

        return reply(question);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a question. Please try again later🤕.");
    }
});
cmd({
    pattern: "truth",
    desc: "Get a random truth question",
    react: "🌚",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://api.truthordarebot.xyz/v1/truth';  // API for random trurh
        const response = await axios.get(url);
        const truthQuestion = data.question;

        const truthmessage = `
  *X-BOT-MD RANDOM TRUTH*

${truthQuestion}


`;

        return reply(truthQuestion);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a truth. Please try again later🤕.");
    }
});
cmd({
    pattern: "dare",
    desc: "Get a random date question",
    react: "🌝",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://api.truthordarebot.xyz/v1/dare';  // API for random dare
        const response = await axios.get(url);
        const dareChallenge = data.question;

        const daremessage = `
  *X-BOT-MD RANDOM DARE*

${dareChallenge}


`;

        return reply(dareChallenge);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a dare. Please try again later🤕.");
    }
});
 
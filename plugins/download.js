const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');


cmd({
  'pattern': "tiktok",
  'alias': ['tt'],
  'react': '🎥',
  'desc': "download tt videos",
  'category': "download",
  'filename': __filename
}, async (conn, m, store, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q && !q.startsWith('https://')) {
      return reply("*`Need url`*");
    }
    store.react('⬇️');
    let tiktokData = await downloadTiktok(q);
    let captionMessage = 
      "╭━━━〔 *X-BOT-MD* 〕━━━┈⊷\n" +
      "┃▸╭───────────\n" +
      "┃▸┃๏ *TIKTOK DOWNLOADER*\n" +
      "┃▸└───────────···๏\n" +
      "╰────────────────┈⊷\n" +
      "╭━━━❐━⪼\n" +
      `┇๏ *Title* - ${tiktokData.result.title} \n` +
      "╰━━━❐━⪼\n" +
      "╭━❮ *Download Video* ❯━┈⊷\n" +
      "┃▸╭─────────────·๏\n" +
      "┃▸┃๏ *1*     ┃  *SD Quality*\n" +
      "┃▸┃๏ *2*     ┃  *HD Quality*\n" +
      "┃▸└────────────┈⊷\n" +
      "╰━━━━━━━━━━━━━━━⪼\n" +
      "╭━❮ *Download Audio* ❯━┈⊷\n" +
      "┃▸╭─────────────·๏\n" +
      "┃▸┃๏ *3*     ┃  *Audio*\n" +
      "┃▸└────────────┈⊷\n" +
      "╰━━━━━━━━━━━━━━━⪼\n" +
      "> *© Pᴏᴡᴇʀᴇᴅ Bʏ Dᴀᴠɪᴅx*";

    const sentMessage = await conn.sendMessage(from, {
      'image': { 'url': tiktokData.result.image },
      'caption': captionMessage
    });

    const messageID = sentMessage.key.id;

    conn.ev.on("messages.upsert", async message => {
      const receivedMessage = message.messages[0];
      if (!receivedMessage.message) return;

      const userResponse = receivedMessage.message.conversation || 
                           receivedMessage.message.extendedTextMessage?.["text"];
      const chatID = receivedMessage.key.remoteJid;
      const isReplyToBotMessage = receivedMessage.message.extendedTextMessage &&
                                  receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToBotMessage) {
        await conn.sendMessage(chatID, {
          'react': { 'text': '⬇️', 'key': receivedMessage.key }
        });

        let downloadLinks = tiktokData.result;

        await conn.sendMessage(chatID, {
          'react': { 'text': '⬆️', 'key': receivedMessage.key }
        });

        if (userResponse === '1') {
          await conn.sendMessage(chatID, {
            'video': { 'url': downloadLinks.dl_link.download_mp4_1 },
            'caption': "*© Powered By Dᴀᴠɪᴅx*"
          }, { 'quoted': receivedMessage });
        } else if (userResponse === '2') {
          await conn.sendMessage(chatID, {
            'video': { 'url': downloadLinks.dl_link.download_mp4_2 },
            'caption': "*© Powered By Dᴀᴠɪᴅx*"
          }, { 'quoted': receivedMessage });
        } else if (userResponse === '3') {
          await conn.sendMessage(chatID, {
            'audio': { 'url': downloadLinks.dl_link.download_mp3 },
            'mimetype': "audio/mpeg"
          }, { 'quoted': receivedMessage });
        }
      }
    });
  } catch (error) {
    console.log(error);
    reply('' + error);
  }
});

// Facebook-dl

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "*`Need URL`*" }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const fbData = await facebook(q);
    
    const caption = `╭━━━〔 *FB DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *Duration*: ${fbData.result.duration}\n`
      + `╰━━━⪼\n\n`
      + `🌐 *Download Options:*\n`
      + `1️⃣  *SD Quality*\n`
      + `2️⃣  *HD Quality*\n`
      + `🎵 *Audio Options:*\n`
      + `3️⃣  *Audio*\n`
      + `4️⃣  *Document*\n`
      + `5️⃣  *Voice*\n\n`
      + `📌 *Reply with the number to download your choice.*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: fbData.result.thumbnail },
      caption: caption
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        let videoLinks = fbData.result.links;

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.SD },
              caption: "📥 *Downloaded in SD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.HD },
              caption: "📥 *Downloaded in HD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          case "4":
            await conn.sendMessage(senderID, {
              document: { url: videoLinks.SD },
              mimetype: "audio/mpeg",
              fileName: "Facebook_Audio.mp3",
              caption: "📥 *Audio Downloaded as Document*"
            }, { quoted: receivedMsg });
            break;

          case "5":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mp4",
              ptt: true
            }, { quoted: receivedMsg });
            break;

          default:
            reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});

// twitter-dl

cmd({
  pattern: "twitter",
  alias: ["tweet", "twdl"],
  desc: "Download Twitter videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result) {
      return reply("⚠️ Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;

    const caption = `╭━━━〔 *TWITTER DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *Description:* ${desc || "No description"}\n`
      + `╰━━━⪼\n\n`
      + `📹 *Download Options:*\n`
      + `1️⃣  *SD Quality*\n`
      + `2️⃣  *HD Quality*\n`
      + `🎵 *Audio Options:*\n`
      + `3️⃣  *Audio*\n`
      + `4️⃣  *Document*\n`
      + `5️⃣  *Voice*\n\n`
      + `📌 *Reply with the number to download your choice.*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb },
      caption: caption
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: video_sd },
              caption: "📥 *Downloaded in SD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              video: { url: video_hd },
              caption: "📥 *Downloaded in HD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: video_sd },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          case "4":
            await conn.sendMessage(senderID, {
              document: { url: video_sd },
              mimetype: "audio/mpeg",
              fileName: "Twitter_Audio.mp3",
              caption: "📥 *Audio Downloaded as Document*"
            }, { quoted: receivedMsg });
            break;

          case "5":
            await conn.sendMessage(senderID, {
              audio: { url: video_sd },
              mimetype: "audio/mp4",
              ptt: true
            }, { quoted: receivedMsg });
            break;

          default:
            reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});

// MediaFire-dl

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "To download MediaFire files.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid MediaFire link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.dl_link) {
      return reply("⚠️ Failed to fetch MediaFire download link. Ensure the link is valid and public.");
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *File Name:* ${file_name}\n`
      + `┃▸ *File Type:* ${mime_type}\n`
      + `╰━━━⪼\n\n`
      + `📥 *Downloading your file...*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});

// Instagram-dl

cmd({
  pattern: "ig",
  alias: ["insta", "Instagram"],
  desc: "To download Instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ Please provide a valid Instagram link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/instagram?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result) {
      return reply("⚠️ Failed to fetch Instagram video. Please check the link and try again.");
    }

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    for (const media of data.result) {
      if (media.url) {
        await conn.sendMessage(from, {
          video: { url: media.url },
          mimetype: "video/mp4",
          caption: "📥 *Instagram Video Downloaded Successfully!*"
        }, { quoted: m });

        await conn.sendMessage(from, {
          react: { text: "✅", key: m.key }
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});

// apk-dl

cmd({
  pattern: "apk",
  desc: "Download APK from Aptoide.",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide an app name to search.");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("⚠️ No results found for the given app name.");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2); // Convert bytes to MB

    const caption = `╭━━━〔 *APK Downloader* 〕━━━┈⊷
┃ 📦 *Name:* ${app.name}
┃ 🏋 *Size:* ${appSize} MB
┃ 📦 *Package:* ${app.package}
┃ 📅 *Updated On:* ${app.updated}
┃ 👨‍💻 *Developer:* ${app.developer.name}
╰━━━━━━━━━━━━━━━┈⊷
🔗 *Powered By David-x*`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while fetching the APK. Please try again.");
  }
});

// G-Drive-DL

cmd({
  pattern: "gdrive",
  desc: "Download Google Drive files.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Google Drive link.");
    }

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const downloadUrl = response.data.result.downloadUrl;

    if (downloadUrl) {
      await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: response.data.result.mimetype,
        fileName: response.data.result.fileName,
        caption: "*© Powered By JawadTechX*"
      }, { quoted: m });

      await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    } else {
      return reply("⚠️ No download URL found. Please check the link and try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while fetching the Google Drive file. Please try again.");
  }
}); 

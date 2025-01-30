const path = require("path");
const { tmpdir } = require("os");
const fetch = require("node-fetch");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require("../lib/functions");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { cmd } = require('../command');
const { videoToWebp } = require('../lib/video-utils');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../config");

cmd(
  {
    pattern: 'vidsticker',
    alias: ['vs',],
    desc: 'Convert GIF/Video to a sticker.',
    category: 'sticker',
    use: '<reply media or URL>',
    filename: __filename,
  },
  async (conn, mek, m, { quoted, args, reply }) => {
    try {
      if (!mek.quoted) return reply('*Reply to a video or GIF to convert it to a sticker!*');

      const mime = mek.quoted.mtype;
      if (!['videoMessage', 'imageMessage'].includes(mime)) {
        return reply('*Please reply to a valid video or GIF.*');
      }

      // Download the media file
      const media = await mek.quoted.download();

      // Convert the video to a WebP buffer
      const webpBuffer = await videoToWebp(media);

      // Generate sticker metadata
      const sticker = new Sticker(webpBuffer, {
        pack: config.STICKER_NAME || 'My Pack',
        author: '', // Leave blank or customize
        type: StickerTypes.FULL, // FULL for regular stickers
        categories: ['🤩', '🎉'], // Emoji categories
        id: '12345', // Optional ID
        quality: 75, // Set quality for optimization
        background: 'transparent', // Transparent background
      });

      // Convert sticker to buffer and send
      const stickerBuffer = await sticker.toBuffer();
      return conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
      console.error(error);
      reply(`❌ An error occurred: ${error.message}`);
    }
  }
);
    

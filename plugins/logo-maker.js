const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");

cmd({
  pattern: "logo",
  desc: "Create logos",
  react: '🎗',
  category: "logo",
  filename: __filename
}, async (conn, message, store, { 
  from, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, 
  isAdmins, reply 
}) => {
  try {
    if (!args[0]) {
      return reply("*_Please give me a text._*");
    }

    let responseText = `*X-BOT-MD LOGO MAKER *\n\n`
    + `╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼➻\n`
    + `*◈ Text:* ${q}\n`
    + `╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼➻\n\n`
    + `*🔢 Reply with a number to choose a style ➠*\n\n`
    + ` 1 ➠ Black Pink\n`
    + ` 2 ➠ Black Pink 2\n`
    + ` 3 ➠ Silver 3D\n`
    + ` 4 ➠ Naruto\n`
    + ` 5 ➠ Digital Glitch\n`
    + ` 6 ➠ Pixel Glitch\n`
    + ` 7 ➠ Comic Style\n`
    + ` 8 ➠ Neon Light\n`
    + ` 9 ➠ Free Bear\n`
    + `10 ➠ Devil Wings\n`
    + `11 ➠ Sad Girl\n`
    + `12 ➠ Leaves\n`
    + `13 ➠ Dragon Ball\n`
    + `14 ➠ Handwritten\n`
    + `15 ➠ Neon Light \n`
    + `16 ➠ 3D Castle Pop\n`
    + `17 ➠ Frozen Christmas\n`
    + `18 ➠ 3D Foil Balloons\n`
    + `19 ➠ 3D Colourful Paint\n`
    + `20 ➠ American Flag 3D\n\n`
    + `> *© Powered By JawadTechX*`;

    let sentMessage = await conn.sendMessage(from, { text: responseText, mentions: [sender] }, { quoted });

    conn.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      
      if (!receivedMessage.message || !receivedMessage.message.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      
      if (receivedMessage.message.extendedTextMessage.contextInfo && 
          receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        
        const logoUrls = {
          '1': "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
          '2': "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
          '3': "https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html",
          '4': "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
          '5': "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html",
          '6': "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html",
          '7': "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html",
          '8': "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
          '9': "https://en.ephoto360.com/free-bear-logo-maker-online-673.html",
          '10': "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html",
          '11': "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html",
          '12': "https://en.ephoto360.com/create-typography-status-online-with-impressive-leaves-357.html",
          '13': "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html",
          '14': "https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html",
          '15': "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
          '16': "https://en.ephoto360.com/create-a-3d-castle-pop-out-mobile-photo-effect-786.html",
          '17': "https://en.ephoto360.com/create-a-frozen-christmas-text-effect-online-792.html",
          '18': "https://en.ephoto360.com/beautiful-3d-foil-balloon-effects-for-holidays-and-birthday-803.html",
          '19': "https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html",
          '20': "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html"
        };

        if (logoUrls[receivedText]) {
          let response = await fetchJson(`https://api-pink-venom.vercel.app/api/logo?url=${logoUrls[receivedText]}&name=${q}`);
          await conn.sendMessage(from, { image: { url: response.result.download_url }, caption: "> *© Powered By David-x*" }, { quoted });
        } else {
          reply("*_Invalid number. Please reply with a valid number._*");
        }
      }
    });
  } catch (error) {
    console.log(error);
    reply(`Error: ${error.message}`);
  }
});
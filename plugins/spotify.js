const axios = require("axios");
const yts = require("yt-search");
const { youtube } = require("btch-downloader");
const { cmd } = require('../command');

cmd({
  pattern: 'spotify',
  alias: ["ytmusic", "spoti"],
  react: '🎵',
  desc: "Fetch audio from Spotify or YouTube",
  category: "download",
  filename: __filename
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
  botNumber, 
  pushname, 
  reply 
}) => {
  if (!q) return reply("Please provide a title or link (Spotify/YouTube)!");

  reply("Fetching audio... 🎧");

  try {
    // Run Spotify & YouTube search in parallel to speed up the process
    const [spotifySearch, ytResults] = await Promise.all([
      axios.get(`https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(q)}`).catch(() => null),
      yts(q).catch(() => null)
    ]);

    // Check if Spotify returned results
    const track = spotifySearch?.data?.[0];
    if (track) {
      const spotifyDownload = await axios({
        url: `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(track.url)}`,
        method: "GET",
        responseType: 'stream'
      }).catch(() => null);

      if (spotifyDownload && spotifyDownload.headers["content-type"] === "audio/mpeg") {
        await conn.sendMessage(from, {
          audio: spotifyDownload.data,
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: track.title,
              body: "Artist: " + track.artist,
              mediaType: 1,
              sourceUrl: track.url,
              renderLargerThumbnail: true
            }
          }
        });
        return; // Stop here if Spotify was successful
      }
    }

    // If Spotify failed, try YouTube
    const video = ytResults?.videos?.[0];
    if (video && video.seconds < 3600) { // Less than 1 hour
      const ytDownload = await youtube(video.url).catch(() => null);
      if (ytDownload && ytDownload.mp3) {
        await conn.sendMessage(from, {
          audio: { url: ytDownload.mp3 },
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: video.title,
              body: "Fetched from YouTube",
              mediaType: 1,
              sourceUrl: video.url,
              renderLargerThumbnail: true
            }
          }
        });
        return;
      }
    }

    reply("No suitable results found on Spotify or YouTube.");
  } catch (error) {
    console.error("Audio Fetch Error:", error.message);
    reply("An error occurred while fetching audio.");
  }
});
//Powered By Mr Frank


const { Storage } = require('megajs'); // Import the Storage class from megajs
const { cmd } = require('../command'); // Assuming you have a command handler
const fs = require('fs'); // For file system operations
const { promisify } = require('util');
const streamPipeline = promisify(require('stream').pipeline);

cmd({
    pattern: "library", // Command trigger
    alias: ["lib"], // Aliases
    use: '.library', // Example usage
    react: "📚", // Emoji reaction
    desc: "Access the Library.", // Description
    category: "logo", // Command category
    filename: __filename // Current file name
},

async (conn, mek, m, { from, reply, senderNumber }) => {
    try {
        // Welcome message with image
        const message = "Welcome to Library😃📚!\n\nTo proceed, type `.showlibrary`.\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx";

        await conn.sendMessage(from, {
            image: { url: `https://i.imgur.com/rzPIk3t.jpeg` }, // Image URL
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363348038810906@newsletter',
                    newsletterName: '『 𝗫-𝗠𝗗 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to initialize the library. Please try again later.*");
    }
});

cmd({
    pattern: "showlibrary", // Command trigger
    alias: ["showlib", "listbooks"], // Aliases
    use: '.showlibrary', // Example usage
    react: "📂", // Emoji reaction
    desc: "List all files in the  Library.", // Description
    category: "logo", // Command category
    filename: __filename // Current file name
},

async (conn, mek, m, { from, reply, senderNumber }) => {
    try {
        const username = "kebefe9699@rykone.com"; // dont touch my things lol 
        const password = "books123"; // Only Mr Frank Can

        // Authenticate with Mega.nz using the Storage class
        const storage = await new Storage({
            email: username,
            password: password,
            userAgent: 'Mozilla/5.0' // Add a user agent to avoid issues
        }).ready;

        // Fetch files from the root directory
        const files = storage.root.children;

        if (files.length === 0) {
            return reply("No files found in the  Library."); // No files found
        }

        // Construct a numbered list of files
        let fileList = " 📑 `X-BOT-MD LIBRARY` \n\n⟣━━━━━━━━━━━━⟢\n*📂 Available Books:*\n";
        fileList += `*🏮 Total Books: ${files.length}*\n⟣━━━━━━━━━━━━⟢\n\n`; // Add total files count here
        files.forEach((file, index) => {
            fileList += `${index + 1}. ${file.name}\n`; // Add file name to the list
        });

        // Footer message
        fileList += "\n*To download a book, simply reply with the number of the book.*\n\n*Example:* `download 1`";

        // Send the list to the user
        await reply(fileList);
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to fetch files from the  Library. Please try again later.*");
    }
});

cmd({
    pattern: "download", // Command trigger
    alias: ["dl", "getbook"], // Aliases
    use: '.download <number>', // Example usage
    react: "📥", // Emoji reaction
    desc: "Download a book from the SubZero Library.", // Description
    category: "logo", // Command category
    filename: __filename // Current file name
},

async (conn, mek, m, { from, reply, senderNumber, args }) => {
    try {
        const username = "kebefe9699@rykone.com"; // Your Mega.nz username
        const password = "books123"; // Your Mega.nz password

        // Authenticate with Mega.nz using the Storage class
        const storage = await new Storage({
            email: username,
            password: password,
            userAgent: 'Mozilla/5.0' // Add a user agent to avoid issues
        }).ready;

        // Fetch files from the root directory
        const files = storage.root.children;

        if (files.length === 0) {
            return reply("No files found in the SubZero Library."); // No files found
        }

        // Check if the user provided a file number
        if (!args[0]) {
            return reply("*Please specify the number of the book you want to download.*\n*Example:* `download 1`");
        }

        const fileNumber = parseInt(args[0]); // Get the file number

        if (fileNumber < 1 || fileNumber > files.length) {
            return reply("*Invalid book number. Please provide a valid book number.*");
        }

        const fileToDownload = files[fileNumber - 1]; // Get the file by index

        // Download the file to a temporary location
        const tempFilePath = `./temp_${fileToDownload.name}`;
        const fileStream = fs.createWriteStream(tempFilePath);
        const downloadStream = await fileToDownload.download();

        // Pipe the download stream to the file
        await streamPipeline(downloadStream, fileStream);

        // Send the file to the user
        await conn.sendMessage(from, {
            document: fs.readFileSync(tempFilePath),
            fileName: fileToDownload.name,
            mimetype: 'application/octet-stream', // Adjust mimetype if needed
            caption: `*✅ Successfully Downloaded: ${fileToDownload.name}*`
        });

        // Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);

    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to download the book. Please try again later.*");
    }
});

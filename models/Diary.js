const mongoose = require('mongoose');

// Diary Schema
const diarySchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User's WhatsApp ID
    note: { type: String, required: true },   // Diary note
    timestamp: { type: Date, default: Date.now }, // Timestamp of the note
    passphrase: { type: String, default: null } // Add passphrase field
});

// Diary Model
const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;

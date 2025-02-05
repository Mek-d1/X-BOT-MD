const mongoose = require('mongoose');

// Schema for bot settings
const botSettingsSchema = new mongoose.Schema({
    userId: String, // User's WhatsApp ID
    autoBio: { type: Boolean, default: false } // AutoBio setting
});

// Export the model
module.exports = mongoose.model('BotSettings', botSettingsSchema);

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tracks: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
    },
    lastModified: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    privacy: {
        type: String,
        required: true,
        default: "private"
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);
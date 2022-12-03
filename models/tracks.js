const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    track_title: {
        type: String,
        required: true
    },
    artist_name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist' 
    },
    album_title: {
        type: String,
        required: true
    },
    track_genres: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Track', trackSchema);
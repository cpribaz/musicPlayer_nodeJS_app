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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Album' 
    },
    track_genres: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre' 
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Track', trackSchema);
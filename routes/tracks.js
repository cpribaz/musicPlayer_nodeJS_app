const express = require('express');
const Track = require('../models/tracks');
const Artist = require('../models/artist');
const router = express.Router();

//all tracks route
router.get('/', async (req, res) =>{
    res.send('All Tracks');
});

//new tracks route 
router.get('/new', async (req, res) => {
    try{
        const artists = await Artist.find({});
        const track = new Track();
        res.render('tracks/new', {
            artists: artists,
            track, track
        });
    } catch{
        res.redirect('/tracks');
    }
});

//create track
router.post('/', async (req, res) => {
    res.send('Create Tracks');
});

module.exports = router;
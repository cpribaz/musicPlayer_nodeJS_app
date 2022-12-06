const express = require('express');
const Artist = require('../models/artist');
const router = express.Router();

//all artists route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.artist_name != null && req.query.artist_name !== '') {
        searchOptions.artist_name = new RegExp(req.query.artist_name, 'i');
    }
    try{
        const artists = await Artist.find(searchOptions).limit(20);
        res.render('artists/index', {
            artists: artists, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display artist page route 
router.get('/new', (req, res) => {
    res.render('artists/new', {artists: new Artist() });
});

//create artist
router.post('/', async (req, res) => {
    const artist = new Artist({
        artist_name: req.body.artist_name
    })
    try{
        const newArtist = await artist.save()
        // res.redirect(`artists/${newArtist.id}`)
        res.redirect('artists');
    } catch {
        res.render('artists/new', {
            artist: artist, 
            errorMessage: 'Error creating artist'
        });
    }
});

module.exports = router;
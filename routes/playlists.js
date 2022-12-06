const express = require('express');
const Playlist = require('../models/playlist');
const router = express.Router();

//all playlists route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        const playlists = await Playlist.find(searchOptions).limit(20);
        res.render('playlists/index', {
            playlists: playlists, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display playlists page route 
router.get('/new', (req, res) => {
    res.render('playlists/new', {playlist: new Playlist() });
});

//create playlist
router.post('/', async (req, res) => {
    const playlist = new Playlist({
        name: req.body.name
    })
    try{
        const newPlaylist = await playlist.save()
        // res.redirect(`playlists/${newPlaylist.id}`)
        res.redirect('playlists');
    } catch {
        res.render('playlists/new', {
            playlist: playlist, 
            errorMessage: 'Error creating playlist'
        });
    }
});

module.exports = router;
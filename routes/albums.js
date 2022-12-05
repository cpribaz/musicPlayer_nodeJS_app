const express = require('express');
const Album = require('../models/album');
const router = express.Router();

//all albums route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        const albums = await Album.find(searchOptions);
        res.render('albums/index', {
            albums: albums, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display album page route 
router.get('/new', (req, res) => {
    res.render('albums/new', {albums: new Album() });
});

//create album
router.post('/', async (req, res) => {
    const album = new Album({
        name: req.body.name
    })
    try{
        const newAlbum = await album.save()
        // res.redirect(`artists/${newArtist.id}`)
        res.redirect('albums');
    } catch {
        res.render('albums/new', {
            album: album, 
            errorMessage: 'Error creating album'
        });
    }
});

module.exports = router;
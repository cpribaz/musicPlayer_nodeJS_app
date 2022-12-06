const express = require('express');
const Track = require('../models/tracks');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Genre = require('../models/genre');
const router = express.Router();

//all tracks route
router.get('/', async (req, res) =>{
    let query = Track.find();
    if(req.query.track_title != null && req.query.track_title != '') {
        query = query.regex('track_title', new RegExp(req.query.track_title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('createdAt', req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('createdAt', req.query.publishedAfter)
    }
    try{
        const tracks = await query.limit(20).exec();
        res.render('tracks/index', {
            tracks: tracks, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//new tracks route 
router.get('/new', async (req, res) => {
    renderNewPage(res, new Track());
});

//create track
router.post('/', async (req, res) => {
    const track = new Track({
        track_title: req.body.name,
        artist_name: req.body.artist,
        album_title: req.body.album,
        track_genres: req.body.genre, 
        createdAt: new Date(req.body.publishDate) 
    })

    try{
        const newTrack = await track.save();
        // res.redirect(`books/${newTrack.id}`);
        res.redirect(`tracks`);
    } catch{
        renderNewPage(res, track, true)
    }
});

async function renderNewPage(res, track, hasError = false){
    try{
        const artists = await Artist.find({});
        const albums = await Album.find({});
        const genres = await Genre.find({});
        const params = {
            artists: artists,
            albums, albums,
            genres, genres,
            track, track
        }
        if (hasError) params.errorMessage = 'Error creating track';
        res.render('tracks/new', params);
    } catch{
        res.redirect('/tracks');
    }
}

module.exports = router;
const express = require('express');
const router = express.Router();

//all playlists route
router.get('/', (req, res) =>{
    res.render('playlists/index');
});

//display playlists page route 
router.get('/new', (req, res) => {
    res.render('playlists/new');
});

//create playlist
router.post('/', (req, res) => {
    res.send('Create');
});

module.exports = router;
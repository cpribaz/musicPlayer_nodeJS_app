if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const playlistRouter = require('./routes/playlists');
const trackRouter = require('./routes/tracks');
const artistRouter = require('./routes/artists');
const albumRouter = require('./routes/albums');
const genreRouter = require('./routes/genres');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to mongoose'));

app.use('/', indexRouter);
app.use('/playlists', playlistRouter);
app.use('/tracks', trackRouter);
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/genres', genreRouter);

app.listen(process.env.PORT || 3000);
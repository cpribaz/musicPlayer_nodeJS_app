if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const users = [];
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    name:{
        type: String
    }
})
module.exports = user = mongoose.model('user',userSchema);

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
app.use(express.urlencoded({extended: false}))

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

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', (req, res) => {
    
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch{
        res.redirect('/register');        
    }
})

app.listen(process.env.PORT || 3000);
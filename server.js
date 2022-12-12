if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session')
require('./passport-config')

const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
let users = [];

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
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to mongoose'));

app.use('/home', checkAuthenticated, indexRouter);
app.use('/playlists', checkAuthenticated, playlistRouter);
app.use('/tracks', checkAuthenticated, trackRouter);
app.use('/artists', checkAuthenticated, artistRouter);
app.use('/albums', checkAuthenticated, albumRouter);
app.use('/genres',checkAuthenticated, genreRouter);
app.use('/profile', checkAuthenticated)

const User = require('./models/user');

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const users = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
        await users.save();
        res.redirect('/login');
    } catch(err){
        console.log(err)
        res.redirect('/register');        
    }
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs');
})

app.post('/profile', passport.authenticate('local', {
    successRedirect: '/updateProfile',
    failureRedirect: '/profile',
    failureFlash: true
}))

app.get('/updateProfile', (req, res) => {
    res.render('updateProfile.ejs');
})

app.post('/updateProfile', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.find(id)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/profile');
    } catch{
        res.redirect('/profile');        
    }
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/home',
   failureRedirect: '/login'
}));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}


app.listen(process.env.PORT || 3000);
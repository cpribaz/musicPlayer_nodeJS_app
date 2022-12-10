const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const { application } = require('express');

function initialize(passport, getUserByEmail, getUserById) {
    var authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user==null){
            return done(null, false, {message: 'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback   : true
    },  function(request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
      }
      ))

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initialize;
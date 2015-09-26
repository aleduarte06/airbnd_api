"use strict";

var passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    userModel = require('mongoose').model('User');

passport.use(new facebookStrategy({
    clientID: '1072842999394931',
    clientSecret: 'da08a8bb164d90272a8f8316ddb1f076',
    callbackURL: "http://127.0.0.1:8000/auth/facebook/callback",
    scope:['email'],
    profileFields: ['email','displayName'],
    session:false
}, function(accessToken, refreshToken, profile, done){
    var query = {
        email: profile.emails[0].value
    };
    userModel.findOne(query)
        .then(function(user){
            if(user){
                done(null,user);
            }else{
                done({error:'not found'});
            }
        })
        .catch(function(err){
            done({error: err.message})
        })
}));
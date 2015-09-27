"use strict";

var passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    userModel = require('mongoose').model('User');

passport.use(new facebookStrategy({
    clientID: '1072842999394931',
    clientSecret: 'da08a8bb164d90272a8f8316ddb1f076',
    callbackURL: "http://fuf.me:8000/auth/facebook/callback",
    profileFields: ['email','displayName'],
    session:false
}, function(accessToken, refreshToken, profile, done){
    userModel.findOne({'social.facebook.id': profile.id})
        .then(function(user){
            if(user) done(null,user);
            else {
                userModel.create({
                    email: profile.emails[0].value,
                    fullname: profile.displayName,
                    active: true,
                    social:{
                        facebook:{
                            id: profile.id,
                            token: accessToken
                        }
                    }
                })
                    .then(function(user){
                        done(null, user);
                    }, function(err){
                        done(err.message);
                    });
            }
        })
        .catch(function(err){
            done(err.message)
        })
}));
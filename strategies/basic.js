"use strict";

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    userModel = require('mongoose').model('User');

passport.use(new BasicStrategy(
    function(username, password, done){
        userModel.findOne({email: username})
            .then(function(user){
                if(!user) return done(null, false);
                if(!user.verifyPassword(password)) return done(null, false);
                return done(null, user)
            })
            .catch(function(err){
                return done(err)
            })
    }
));
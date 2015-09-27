"use strict";

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    userModel = require('mongoose').model('User');

passport.use(new BasicStrategy(
    function(username, password, done){
        userModel.findOne({email: username})
            .then(function(user){
                if(!user) return done(null, false);
                user.verifyPassword(password, function(isMatch){
                    if(isMatch) return done(null, user);
                    done(null, false)
                });
            })
            .catch(function(err){
                done(err)
            })
    }
));
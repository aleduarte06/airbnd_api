"use strict";
var passport = require('passport'),
    JWTStrategy = require('passport-jwt').Strategy,
    config = require('../config'),
    userModel = require('mongoose').model('User');

passport.use(new JWTStrategy({
    secretOrKey: config.secretToken
}, function(jwt_payload, done){
    userModel.findOne({"_id": jwt_payload.sub})
        .then(function(user){
            if(user)
                done(null, user);
            else
                done(null, false)
        })
}));


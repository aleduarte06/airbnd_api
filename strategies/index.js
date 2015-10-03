"use strict";

var passport = require('passport'),
    config = require('../config'),
    jwt = require('jwt-simple');

require('./facebook');
require('./jwt');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

var facebookCallback = function(req, res) {
    var tokenPayload = {
        sub: req.user._id
    };

    res.status(200).json({
        token: jwt.encode(tokenPayload ,config.secretToken)
    })
};

module.exports = function(app) {
    app.use(passport.initialize());
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), facebookCallback);
};
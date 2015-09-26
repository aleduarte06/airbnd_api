"use strict";

var passport = require('passport'),
    config = require('../config'),
    jwt = require('jwt-simple'),
    userModel = require('mongoose').model('User');

require('./facebook');
require('./basic');
require('./jwt');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

/* Facebook Auth */
var facebookCallback = function(req, res) {
    var tokenPayload = {
        id: req.user._id
    };

    res.status(200).json({
        token: jwt.encode(tokenPayload ,config.secretToken)
    })
};


/* Basic Auth*/
var basicAuth = function(req, res){
    var tokenPayload = {
        sub: req.user._id
    };

    res.json(jwt.encode(tokenPayload, config.secretToken))
};

module.exports = function(app) {
    app.use(passport.initialize());
    app.get('/login', passport.authenticate('basic'), basicAuth);
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), facebookCallback);
};
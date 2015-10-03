"use strict";

var usersUrl = require('./users'),
    reservationsUrl = require('./reservations'),
    apartmentsUrl = require('./apartments'),
    authCtrl = require('../controllers/auth'),
    passport = require('passport');

function Routes (app) {
    app.post('/upload', function (req, res) {
        console.log(req.files);
        res.json('ok')
    });
    app.post('/register', authCtrl.register);
    app.post('/login', authCtrl.login);
    app.use('/users',passport.authenticate('jwt', {session: false}), usersUrl);
    app.use('/reservations',passport.authenticate('jwt', {session: false}), reservationsUrl);
    app.use('/apartments',passport.authenticate('jwt', {session: false}), apartmentsUrl);
}

module.exports = Routes;
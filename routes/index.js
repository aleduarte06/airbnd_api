"use strict";

var usersUrl = require('./users');
var reservationsUrl = require('./reservations');
var apartmentsUrl = require('./apartments');
var passport = require('passport');

function Routes (app) {
    app.use('/users',passport.authenticate('jwt', {session: false}), usersUrl);
    app.use('/reservations',passport.authenticate('jwt', {session: false}), reservationsUrl);
    app.use('/apartments',passport.authenticate('jwt', {session: false}), apartmentsUrl);
}

module.exports = Routes;
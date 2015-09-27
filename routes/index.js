"use strict";

var usersUrl = require('./users');
var reservationsUrl = require('./reservations');
var apartmentsUrl = require('./apartments');
var passport = require('passport');

function Routes (app) {
    app.use('/users',passport.authenticate('jwt', {session: false}), usersUrl);
    app.use('/reservations',reservationsUrl);
    app.use('/apartments',apartmentsUrl);
}

module.exports = Routes;
var usersUrl = require('./users');
var reservationsUrl = require('./reservations');
var apartmentsUrl = require('./apartments');

function Routes (app) {
    app.use('/users',usersUrl);
    app.use('/reservations',reservationsUrl);
    app.use('/apartments',apartmentsUrl);
}

module.exports = Routes;
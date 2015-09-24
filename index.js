/**
 * Created by aleduarte06 on 24/9/15.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    usersCtrl = require('./controllers/usersCtrl'),
    apartmentsCtrl = require('./controllers/apartmentsCrtl'),
    reservationsCtrl = require('./controllers/reservationsCtrl');

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

router.route('/users')
    .get(usersCtrl.hola);

router.route('/apartments')
    .get(apartmentsCtrl.hola);

router.route('/reservations')
    .get(reservationsCtrl.hola);


app.use(router);


var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
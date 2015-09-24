/**
 * Created by aleduarte06 on 24/9/15.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var usersUrl = require('./routes/users');
var reservationsUrl = require('./routes/reservations');
var apartmentsUrl = require('./routes/apartments');

app.use('/users',usersUrl);
app.use('/reservations',reservationsUrl);
app.use('/apartments',apartmentsUrl);

var urlMongo = "mongodb://aleduarte:aleduarte@ds047591.mongolab.com:47591/cursomongo";

mongoose.connect(urlMongo, function (err) {
    if(err){
        console.error('mongoose connection error');
    }else{
        console.log('alta conexión')
    }
});

var models = require('./models/uses')(app, mongoose);

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
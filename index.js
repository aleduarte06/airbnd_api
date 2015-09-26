/**
 * Created by aleduarte06 on 24/9/15.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    app = express(),
    config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Database */
mongoose.connect(config.mongo_url, function (err) {
    if(err){
        console.error('mongoose connection error');
    }else{
        console.log('Conectado con Mongo');
        onConnect()
    }
});
/* Models */
require('./models')(app, mongoose);

/* Auth */
require('./strategies')(app);

/* Routes */
require('./routes')(app);

function onConnect() {
    var server = app.listen(8000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });
}

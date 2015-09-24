/**
 * Created by aleduarte06 on 24/9/15.
 */
var mongoose = require('mongoose');
var modelUsers  = mongoose.model('users');
exports.hola = function(req, res){

    modelUsers.find(function(err, results) {
        if(err) res.send(500, err.message);
        console.log('GET /tvshows')
        res.status(200).jsonp(results);
    });
    //res.send('holaaaaa aca estamos devolviento todo lo que tiene el controlador usersCtrl')
};
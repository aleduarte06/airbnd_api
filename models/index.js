"use strict";

var fs = require('fs');

function Models(app, mongoose) {
    fs.readdirSync(__dirname)
        .filter(function(file){
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function(file){
            require('./'+file)(app, mongoose);
        });
}
module.exports = Models;
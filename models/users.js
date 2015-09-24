/**
 * Created by aleduarte06 on 24/9/15.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usersSchema = new Schema({
    name:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    token:String
});

module.exports = mongoose.model('users', usersSchema);
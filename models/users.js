"use strict";

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, index: true, unique: true},
    password: String,
    fullname: String,
    active: Boolean,
    reservations: [Schema.Types.ObjectId],
    apartments:[Schema.Types.ObjectId]
});

userSchema.methods.verifyPassword = function(password){
    return this.password == password;
};

module.exports = mongoose.model('User', userSchema);
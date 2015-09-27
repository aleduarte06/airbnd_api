"use strict";

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt = require('bcrypt');


var userSchema = new Schema({
    email: { type: String, index: true, unique: true},
    password: String,
    fullname: String,
    active: Boolean,
    reservations: [Schema.Types.ObjectId],
    apartments:[Schema.Types.ObjectId],
    social: {
        facebook:{
            id: String,
            token: String
        }
    }

});

/* Generate Password */
userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password'))  return next();
    if (user.password) {
        bcrypt.genSalt(8, function(err, salt){
            if(err) return next(err);
            console.log('a');
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err);
                user.password = hash;
                next()
            });
        });
    }
});

/* Verify Password */
userSchema.methods.verifyPassword = function(password, next){
    bcrypt.compare(password, this.password, function(err, isMatch){
        next(isMatch)
    });
};

module.exports = mongoose.model('User', userSchema);
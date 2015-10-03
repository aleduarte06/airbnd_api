"use strict";

var User = require('mongoose').model('User'),
    UserCtrl = require('../controllers/users'),
    jwt = require('jwt-simple'),
    config = require('../config');

exports.register = function (req, res) {
    if (!req.body)
        res.status(500).json({message: 'Form void'});
    User.findOne({"email": req.body.email})
        .then(function (user) {
            if (user) {
                res.status(500).json({message: 'Email already exist'});
            } else {
                UserCtrl.create(req, res)
            }
        })
        .catch(UserCtrl.create)
};

exports.login = function (req, res) {
    User.findOne({'email': req.body.email})
        .then(function(user){
            if (user) {
                user.verifyPassword(req.body.password, function(isMatch){
                    if (isMatch) {
                        var payload = {
                            sub: user._id
                        };

                        res.status(200).json({
                            token: jwt.encode(payload, config.secretToken)
                        });
                    } else {
                        res.status(500).json({message: 'Invalid Password'});
                    }
                })
            } else {
                res.status(404).json({message: 'Invalid Email'});
            }
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};
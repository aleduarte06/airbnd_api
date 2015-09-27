/**
 * Created by aleduarte06 on 24/9/15.
 */
"use strict";

var mongoose = require('mongoose'),
    modelUser  = mongoose.model('User');

exports.getMe = function(req, res){
    modelUser.findOne({"_id": req.user})
        .then(function(user){
            res.status(200).json(user)
        })
        .catch(function(err){
            res.status(500).json({message: err})
        });

};

exports.getAll = function(req, res){
    modelUser.find().select('fullname email reservations apartments')
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(function(err) {
            res.status(500).json({message: err.message});
        });
};

exports.getUser = function(req, res) {
    modelUser.findOne({"_id": req.params.id}).select('fullname email reservations apartments')
        .then(function(user) {
            if (user)
                res.status(200).json(user);
            else
                res.status(404).json({message: 'User does not exist'})
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};

exports.create = function(req, res){
    modelUser.create(req.body)
        .then(function(user){
            res.status(201).json({message: 'User created', data: user});
        },
        function(err){
            res.status(500).json({message: err.message});
        });
};

exports.update = function(req, res) {
    modelUser.findOneAndUpdate({"_id": req.params.id}, req.body)
        .then(function(user) {
            res.status(200).json({message: 'User updated'});
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};

exports.delete = function(req, res) {
    modelUser.findOneAndRemove({"_id": req.params.id})
        .then(function(user){
            res.status(200).json({message: 'User deleted', data: user})
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};
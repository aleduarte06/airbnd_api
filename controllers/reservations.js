/**
 * Created by aleduarte06 on 24/9/15.
 */

"use strict";

var modelReservation = require('mongoose').model('Reservation');

exports.getAll = function(req, res){
    modelReservation.find()
        .then(function(reservations){
            res.status(200).json(reservations);
        })
        .catch(function(err) {
            res.status(500).json({message: err.message});
        })
};

exports.getOne = function(req, res) {
    modelReservation.findOne({"_id": req.params.id})
        .then(function(err, reservation){
            if(reservation)
                res.status(200).json(reservation);
            else
                res.status(404).json({message: 'Reservation does not exist'});
        })
        .catch(function(err) {
            res.status(500).json({message: err.message});
        })
};

exports.create = function(req, res){
    modelReservation.create(req.body).then(function(reservation){
        res.status(201).json({message: 'New reservation', data: reservation});
    },function(err){
        res.status(500).json({message: err.message});
    })
};

exports.update = function(req, res){
    modelReservation.findOneAndUpdate({"_id": req.params.id}, req.body)
        .then(function(reservation) {
            res.status(200).json({message: 'Reservation has been updated'});
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};

exports.delete = function(req, res) {
    modelReservation.findOneAndRemove({"_id": req.params.id})
        .then(function(reservation) {
            res.status(200).json({message: 'User deleted', data: reservation});
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};
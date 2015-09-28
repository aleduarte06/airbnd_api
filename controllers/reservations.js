/**
 * Created by aleduarte06 on 24/9/15.
 */

"use strict";
var mongoose = require('mongoose'),
    modelReservation = mongoose.model('Reservation'),
    modelUser = mongoose.model('User');

var messageNotExist = 'Reservation does not exist';

exports.getAll = function (req, res) {
    modelReservation.find()
        .then(function (reservations) {
            res.status(200).json(reservations);
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};

exports.getOne = function (req, res) {
    modelReservation.findOne({"_id": req.params.id})
        .then(function (reservation) {
            if (reservation)
                res.status(200).json(reservation);
            else
                res.status(404).json({message: messageNotExist})
        })
        .catch(function (err) {
            res.status(500).json({message: err.message})
        })
};

exports.create = function (req, res) {
    modelReservation.create({
        userID: req.user,
        apartmentID: req.body.apartmentID,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }).then(function (reservation) {
        modelUser.findOne({"_id": req.user})
            .then(function (user) {
                user.reservations.push(reservation._id);
                user.save();
                res.status(201).json({message: 'New reservation', data: reservation});
            })
            .catch(function (err) {
                res.status(500).json({message: err.message})
            });
    }, function (err) {
        res.status(500).json({message: err.message});
    })
};

exports.update = function (req, res) {
    modelReservation.findOneAndUpdate({"_id": req.params.id}, req.body)
        .then(function (reservation) {
            if (reservation)
                res.status(200).json({message: 'Reservation has been updated'});
            else
                res.status(404).json({message: messageNotExist})
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};

exports.delete = function (req, res) {
    modelReservation.findOneAndRemove({"_id": req.params.id})
        .then(function(reservation) {
            if (reservation) {
                modelUser.findOne({"_id": req.user})
                    .then(function (user) {
                        req.user.reservations.splice(user.reservations.indexOf(reservation._id), 1);
                        req.user.save();
                        res.status(200).json({message: 'Reservation deleted', data: reservation});
                    })
                    .catch(function (err) {
                        res.status(500).json({message: err.message})
                    })
            } else {
                res.status(404).json({message: messageNotExist})
            }
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};
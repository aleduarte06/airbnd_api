"use strict";

var mongoose = require('mongoose'),
    modelApartments = mongoose.model('Apartment'),
    modelUser = mongoose.model('User');

var messageNotExist = 'Apartment does not exist';

exports.getAll = function (req, res) {
    modelApartments.find()
        .then(function (apartments) {
            res.status(200).json(apartments);
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};

exports.getOne = function (req, res) {
    modelApartments.findOne({"_id": req.params.id})
        .then(function (apartment) {
            if (apartment)
                res.status(200).json(apartment);
            else
                res.status(404).json({message: messageNotExist});
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};

exports.create = function (req, res) {
    modelApartments.create({
        owner: req.user,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        pictures: req.body.pictures,
        reservations: req.body.reservations
    })
        .then(function (apartment) {
            modelUser.findOne({"_id": req.user})
                .then(function (user) {
                    user.apartments.push(apartment._id);
                    user.save();
                    res.status(201).json({message: 'New Apartment', data: apartment});
                })
                .catch(function (err) {
                    throw err
                });
        }, function (err) {
            res.status(500).json({message: err.message});
        })
};

exports.update = function (req, res) {
    modelApartments.findOneAndUpdate({"_id": req.params.id}, req.body)
        .then(function(apartment){
            if (apartment)
                res.status(200).json({message: "Apartment updated"});
            else
                res.status(404).json({message: messageNotExist});
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};

exports.delete = function (req, res) {
    modelApartments.findOneAndRemove({"_id": req.params.id})
        .then(function (apartment) {
            if (apartment) {
                modelUser.findOne({"_id": req.user})
                    .then(function (user) {
                        user.apartments.splice(user.apartments.indexOf(apartment._id), 1);
                        user.save();
                        res.status(200).json({message: 'Apartment deleted', data: apartment});
                    })
                    .catch(function (err) {
                        res.status(500).json({message: err.message})
                    })
            } else {
                res.status(404).json({message: messageNotExist});
            }
        })
        .catch(function (err) {
            res.status(500).json({message: err.message});
        })
};
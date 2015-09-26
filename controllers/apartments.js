"use strict";

var modelApartments = require('mongoose').model('Apartment');


exports.getAll = function(req, res){
    modelApartments.find()
        .then(function(apartments){
            res.status(200).json(apartments);
        })
        .catch(function(err){
            res.status(500).json({message: err.message});
        })
};

exports.getOne = function(req, res){
    modelApartments.findOne({"_id": req.params.id})
        .then(function(apartment){
            if (apartment)
                res.status(200).json(apartment);
            else
                res.status(404).json({message: 'Apartment not exist'});
        })
        .catch(function(err){
            res.status(500).json({message: err.message})
        })
};

exports.create = function(req, res){
    modelApartments.create(req.body)
        .then(function(apartment){
            if (apartment)
                res.status(201).json({message: 'New Apartment', data: apartment})
        }, function(err){
            res.status(500).json({message: err})
        })
};

exports.update = function(req, res){
    modelApartments.findOneAndUpdate({"_id": req.params.id}, req.body)
        .then(function(apartment){
            res.status(200).json({message: "Apartment updated"})
        })
        .catch(function(err){
            res.status(500).json({message: err.message})
        })
};

exports.delete = function(req, res){
    modelApartments.findOneAndRemove({"_id": req.params.id})
        .then(function(apartment){
            res.status(200).json({message: 'Apartment deleted', data: apartment})
        })
        .catch(function(err){
            res.status(500).json({message: err.message})
        })
};
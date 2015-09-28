"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reservationSchema = new Schema({
    userID: Schema.Types.ObjectId,
    apartmentID: Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Reservation', reservationSchema);
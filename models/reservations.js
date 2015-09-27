"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reservationSchema = new Schema({
    userId: Schema.Types.ObjectId,
    apartmentId: Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Reservation', reservationSchema);
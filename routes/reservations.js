"use strict";

var reservationsCtrl = require('../controllers/reservations');
var router = require('express').Router();

router.route('/')
    .get(reservationsCtrl.getAll)
    .post(reservationsCtrl.create);

router.route('/:id')
    .get(reservationsCtrl.getOne)
    .put(reservationsCtrl.update)
    .delete(reservationsCtrl.delete);

module.exports = router;
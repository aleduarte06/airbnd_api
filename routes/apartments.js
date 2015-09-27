"use strict";

var apartmentsCtrl = require('../controllers/apartments');
var router = require('express').Router();

router.route('/')
    .get(apartmentsCtrl.getAll)
    .post(apartmentsCtrl.create);

router.route('/:id')
    .get(apartmentsCtrl.getOne)
    .put(apartmentsCtrl.update)
    .delete(apartmentsCtrl.delete);

module.exports = router;
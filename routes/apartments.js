/**
 * Created by aleduarte06 on 24/9/15.
 */
var apartmentsCtrl = require('../controllers/apartments');
var router = require('express').Router();

router.route('/')
    .get(apartmentsCtrl.hola)
    .post(apartmentsCtrl.hola)
    .put(apartmentsCtrl.hola)
    .delete(apartmentsCtrl.hola);

module.exports = router;
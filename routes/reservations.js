/**
 * Created by aleduarte06 on 24/9/15.
 */
var reservationsCtrl = require('../controllers/reservations');
var router = require('express').Router();

router.route('/')
    .get(reservationsCtrl.hola)
    .post(reservationsCtrl.hola)
    .put(reservationsCtrl.hola)
    .delete(reservationsCtrl.hola);

module.exports = router;
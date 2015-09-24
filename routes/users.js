/**
 * Created by aleduarte06 on 24/9/15.
 */
var usersCtrl = require('../controllers/users');
var router = require('express').Router();

router.route('/')
    .get(usersCtrl.hola)
    .post(usersCtrl.hola)
    .put(usersCtrl.hola)
    .delete(usersCtrl.hola);

module.exports = router;
/**
 * Created by aleduarte06 on 24/9/15.
 */
var usersCtrl = require('../controllers/users');
var router = require('express').Router();

router.route('/')
    .get(usersCtrl.getAll)
    .post(usersCtrl.create);

router.get('/me$', usersCtrl.getMe);

router.route('/:id')
    .get(usersCtrl.getUser)
    .put(usersCtrl.update)
    .delete(usersCtrl.delete);


module.exports = router;
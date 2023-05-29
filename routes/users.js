const express = require('express');
const router = express.Router();
// const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/users', usersController.user);


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);


console.log('users router is loaded');


module.exports = router;
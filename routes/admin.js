const express = require('express');
const router = express.Router();
const passport = require('passport');

const dashboardController = require('../controllers/admin_dashboard');
const addPostsController = require('../controllers/admin_addPost');
const postListsController = require('../controllers/admin_postList');


 //router.get('/userlist',passport.checkAuthentication,usersController.user);

router.get('/dashboard',passport.checkAuthentication,dashboardController.dashboard);

router.get('/addpost',passport.checkAuthentication,addPostsController.addPost);


router.get('/postlist',passport.checkAuthentication,postListsController.postList);




module.exports = router;

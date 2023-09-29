const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');

router.get('/dashboard', (req, res, next) => {
    // Call homeController.home
    passport.checkAuthentication,adminController.adminDashboard(req, res, () => {
        // After homeController.home is done, call homeController.aside
        passport.checkAuthentication,adminController.asideLayout(req, res, next);
    });
});


router.get('/dashboard',passport.checkAuthentication,adminController.adminDashboard);

 router.get('/profile',passport.checkAuthentication,adminController.adminProfile);


// router.get('/postlist',passport.checkAuthentication,adminController.articleList);

// router.get('/display-none',passport.checkAuthentication,adminController.artDisable);

// router.get('/display',passport.checkAuthentication,adminController.artEnable);

// router.post('/save-article',passport.checkAuthentication,adminController.createArticle);




module.exports = router;

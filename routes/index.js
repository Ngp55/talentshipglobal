const express = require('express');

const router = express.Router();

const passport = require('passport');

const homeController = require('../controllers/home_controller');




router.get('/', passport.checkAuthentication,homeController.home);
// router.get('/', (req, res, next) => {
//     // Call homeController.home
//     homeController.home(req, res, () => {
//         // After homeController.home is done, call homeController.aside
//         homeController.asideLayout(req, res, next);
//     });
// });
router.get('/team-page', passport.checkAuthentication,homeController.team);
router.get('/testimonial-page',passport.checkAuthentication, homeController.testimonail);
router.get('/service-page',passport.checkAuthentication, homeController.service);
router.get('/quote-page',passport.checkAuthentication, homeController.quote);
router.get('/feature-page',passport.checkAuthentication, homeController.feature);
router.get('/detail-page',passport.checkAuthentication, homeController.detail);
router.get('/contact-page',passport.checkAuthentication, homeController.contact);
router.get('/blog-page',passport.checkAuthentication, homeController.blog);
router.get('/about-page',passport.checkAuthentication, homeController.about);







// router.get('/single-page/:id',homeController.singlepage);
// router.use('/users',require('./users'));
// router.get('/emp', empController.employee);

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));


console.log('Index router loaded');




module.exports = router;
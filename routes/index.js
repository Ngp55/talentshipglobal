const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');




router.get('/', homeController.home);
// router.get('/', (req, res, next) => {
//     // Call homeController.home
//     homeController.home(req, res, () => {
//         // After homeController.home is done, call homeController.aside
//         homeController.asideLayout(req, res, next);
//     });
// });
router.get('/team-page', homeController.team);
router.get('/testimonial-page', homeController.testimonail);
router.get('/service-page', homeController.service);
router.get('/quote-page', homeController.quote);
router.get('/feature-page', homeController.feature);
router.get('/detail-page', homeController.detail);
router.get('/contact-page', homeController.contact);
router.get('/blog-page', homeController.blog);
router.get('/about-page', homeController.about);







// router.get('/single-page/:id',homeController.singlepage);
// router.use('/users',require('./users'));
// router.get('/emp', empController.employee);

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));


console.log('Index router loaded');




module.exports = router;
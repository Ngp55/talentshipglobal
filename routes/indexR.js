const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const empController = require('../controllers/employee_controller');

router.get('/', homeController.home);
router.get('/emp', empController.employee);

console.log('router loaded');




module.exports = router;
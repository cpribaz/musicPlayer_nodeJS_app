const express = require('express');
const router = express.Router();

//require the controllers 
const product_controller = require('../controllers/product.controller');

//test url to check if all files are communicating properly
router.get('/test', product_controller.test);

module.exports = router;
const Product = require('../models/product.model');

//simple version without validation or sanitization 
exports.test = function (req, res){
    res.send('Greetings from test controller');
};
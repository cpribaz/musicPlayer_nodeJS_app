const express = require('express');
const bodyParser = require('body-parser');

//get routes 
const product = require('./routes/product.route');

//initialize express app 
const app = express();
app.use('/products', product);

//create port number and tell app to listen 
let port = 3000;
app.listen(port, () => {
    console.log('Server is running on port #: ' + port);
});
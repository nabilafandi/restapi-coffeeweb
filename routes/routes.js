const express = require("express");
const routers = express.Router();

const OlseraAuthMiddleware = require('../middleware/OlseraAuthMiddleware');
const authRoute = require('../controllers/auth/auth.routes');
const aboutRoute = require('../controllers/about/about.routes');
const productRoute = require('../controllers/product/product.routes');
const cartRoute = require('../controllers/cart/cart.routes');
const olseraAuthRoute = require('../controllers/olseraAuth/olseraAuth.routes');


// Use your authentication middleware
routers.use(OlseraAuthMiddleware);


routers.use('/olseraauth', olseraAuthRoute);
routers.use('/user', authRoute);
routers.use('/about', aboutRoute);
routers.use('/products', productRoute);
routers.use('/cart', cartRoute);
routers.get('/', (req, res) => {
    const sessionId = req.session.id; 
    console.log('yoursessionid get', sessionId)
    res.send(`Your session ID is: ${sessionId}`);
  });
routers.post('/', (req, res) => {
    const sessionId = req.session.id; 
    console.log('yoursessionid post', sessionId)
    res.send(`Your session ID is: ${sessionId}`);
  });
module.exports = routers;

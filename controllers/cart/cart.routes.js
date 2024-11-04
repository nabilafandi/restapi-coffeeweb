const express = require('express')
const router = express.Router()

const controller = require('./cart.controller')

// router.get('/', controller.getCart)
router.post('/', controller.addToCart)
router.get('/', controller.getCartByUserId)
// router.get('/', (req, res) => {
//     const sessionId = req.session.id; 
//     console.log('yoursessionid get', sessionId)
//     res.send(`Your session ID is: ${sessionId}`);
//   });
// router.post('/', (req, res) => {
//     const sessionId = req.session.id; 
//     console.log('yoursessionid post', sessionId)
//     res.send(`Your session ID is: ${sessionId}`);
//   });
module.exports = router

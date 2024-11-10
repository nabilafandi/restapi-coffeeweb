const express = require('express')
const router = express.Router()

const controller = require('./order.controller')

router.post('/', controller.createOrder)

module.exports = router

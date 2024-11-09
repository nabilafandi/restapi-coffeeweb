const express = require('express')
const router = express.Router()

const controller = require('./olseraAuth.controller')

router.post('/', controller.recreateToken)

module.exports = router

const express = require('express')
const router = express.Router()

const controller = require('./auth.controller')

// router.get('/:data_id', controller.getAboutDetail)
router.post('/', controller.createUser)

module.exports = router
const express = require('express')
const router = express.Router()

const controller = require('./about.controller')

router.get('/:data_id', controller.getAboutDetail)
router.post('/', controller.createAbout)

module.exports = router

const express = require('express')
const router = express.Router()

const controller = require('./product.controller')

router.get('/classification/:classification', controller.getProductsByClassification)
router.get('/list', controller.getProducts)
router.get('/:id', controller.getProductDetails)
router.get('/groups', controller.getProductGroups)

module.exports = router

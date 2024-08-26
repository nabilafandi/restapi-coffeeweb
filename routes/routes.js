const express = require("express")

const router = express.Router();
const aboutController = require('../controllers/aboutController')
// GET /users   

router.get('/about', aboutController.getAboutPage);


module.exports = router;   


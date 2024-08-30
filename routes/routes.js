const express = require("express");
const routers = express.Router();

const aboutRoute = require('../controllers/about/about.routes')

routers.use('/about', aboutRoute)

module.exports = routers;   


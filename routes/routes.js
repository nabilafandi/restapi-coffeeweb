const express = require("express");
const routers = express.Router();

const authRoute = require('../controllers/auth/auth.routes')
const aboutRoute = require('../controllers/about/about.routes')

routers.use('/user', authRoute)
routers.use('/about', aboutRoute)

module.exports = routers;


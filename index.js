require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); 
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000

// DB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
console.log(uri)
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err))

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use('/api/', routes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
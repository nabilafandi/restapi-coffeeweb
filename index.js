require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes/routes'); 

const app = express();
const port = process.env.PORT || 3000;

// DB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Enable credentials (cookies)
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup without MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use an environment variable for security
    resave: false,
    saveUninitialized: true, // Prevent empty sessions
    cookie: {
        secure: false, // Set to true if using HTTPS
        sameSite: 'Lax', // Required for cross-origin requests
        maxAge: 1000 * 60 * 60 // Session cookie expiration time (1 hour)
    }
}));

// Routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

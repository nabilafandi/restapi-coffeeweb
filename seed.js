const mongoose = require('mongoose');
const About = require('./models/about');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err))


// dummyData
const aboutData = {
    title: 'About Our Company',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

console.log(About)


const createAbout = new About(aboutData);
createPlant.save();

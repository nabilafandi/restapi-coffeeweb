const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const About = mongoose.model('About', aboutSchema);

module.exports ={
    About
}
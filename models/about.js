const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    title: String,
    content: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
})

const About = mongoose.model('About', aboutSchema);

module.exports = About
const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    data_id: {
        type: String,
        required:true,
        unique:true
    },
    title: String,
    content: String,
    imageUrl: [String],
})

const About = mongoose.model('About', aboutSchema);

module.exports = About
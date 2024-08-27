const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    url: String,
    tags: [String],
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image
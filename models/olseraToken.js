const mongoose = require('mongoose')

const olseraTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,

    },
    expiryTime: {
        type: Date,
        required: true,
    },
    refreshTokenexpiryTime: {
        type: Date,
        required: true,
    },
    appId: {
        type: String,
        required: true,
    },
    secretKey: {
        type: String,
        required: true,
    },
})

const OlseraToken = mongoose.model('OlseraToken', olseraTokenSchema);
module.exports = OlseraToken
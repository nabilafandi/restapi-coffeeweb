// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: null,
    },
    sessionId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
});

module.exports = mongoose.model('Cart', CartSchema);

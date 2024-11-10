// models/Cart.js
const mongoose = require("mongoose");

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
      productName: {
        type: String,
        required: true,
      },
      isVariant: {
        type: Boolean,
        default: false,
        requried: true,
      },
      productVariantId: {
        type: String,
      },
      variantName: {
        type: String,
        default: false,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
  },
});

CartSchema.pre('save', function(next) {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    this.subTotal = total;
    next();
  });
  
module.exports = mongoose.model("Cart", CartSchema);

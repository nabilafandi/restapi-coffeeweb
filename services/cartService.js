const Cart = require("../models/cart");

const findOrCreateCart = async ({ sessionId, userId, items = [] }) => {
  let cart = await Cart.findOne({ $or: [{ sessionId }, { userId }] });
  if (!cart) {
    cart = new Cart({ userId: userId || null, sessionId, items });
  }
  return cart;
};


module.exports = {
  findOrCreateCart,
};

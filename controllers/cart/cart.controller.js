const Cart = require("../../models/cart");

// Helper to find or create a cart based on sessionId or userId
const findOrCreateCart = async ({ sessionId, userId, items = [] }) => {
  let cart = await Cart.findOne({ $or: [{ sessionId }, { userId }] });
  if (!cart) {
    cart = new Cart({ userId: userId || null, sessionId, items });
  }
  return cart;
};

// Add to cart function
const addToCart = async (req, res) => {
  const sessionId = req.session.id;
  const { userId, items } = req.body;

  try {
    let cart = await findOrCreateCart({ sessionId, userId });

    // Update or add items in the cart
    items.forEach((item) => {
      const existingItem = cart.items.find(
        (i) => i.productId == item.productId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push({
          productName: item.productName,
          variantName: item.variantName,
          productId: item.productId,
          isVariant: item.isVariant,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        });
      }
    });

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add items to the cart" });
  }
};

// Get cart by userId or sessionId
const getCartByUserId = async (req, res) => {
  const sessionId = req.session.id;
  const userId = req.query.userId;

  try {
    const cart = await findOrCreateCart({ sessionId, userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    const simplifiedItems = cart.items.map((item) => ({
      productName: item.productName,
      variantName: item.variantName,
      productId: item.productId,
      isVariant: item.isVariant,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.imageUrl,
    }));
    const response = {
      userId: cart.userId,
      subTotal: cart.subTotal,
      sessionId: cart.sessionId,
      items: simplifiedItems,

    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving cart:", error.message);
    res.status(500).json({ message: "Failed to retrieve the cart" });
  }
};
const deleteCartByUserId = async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  deleteCartByUserId,
};

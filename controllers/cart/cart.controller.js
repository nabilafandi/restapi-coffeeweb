const Cart = require('../../models/cart')

const addToCart = async (req, res) => {
  const sessionId = req.session.id;
  console.log(sessionId)
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ sessionId });

    if (cart) {
      // Update cart items
      items.forEach((item) => {
        const existingItem = cart.items.find(i => i.productId === item.productId);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });
    } else {
      cart = new Cart({ userId: userId || null, sessionId, items });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
// Get cart by userId
const getCartByUserId = async (req, res) => {
  const sessionId = req.session.id;
  console.log(sessionId)



  const userId = req.query.userId;

  try {
    const cart = await Cart.findOne({
      $or: [{ sessionId }, { userId }]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

const deleteCartByUserId = async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addToCart,
  getCartByUserId,
  deleteCartByUserId,
};

const { orderCreate, orderAddItems } = require("../../services/olseraApi");
const { findOrCreateCart } = require("../../services/cartService");

const createOrder = async (req, res) => {
  const items = req.body.items;
  const userId = req.body.userId;
  const sessionId = req.body.sessionId;
  try {
    // Create order
    const orderResponse = await orderCreate();
    console.log('orderresponse', orderResponse)
    const orderId = orderResponse.data.id;

    const addItemsPromises = items.map((item) => {
      const itemProducts = item.isVariant
        ? item.productId + "|" + item.productVariantId
        : item.productId;
      orderAddItems(orderId, itemProducts, item.quantity);
    });

    await Promise.all(addItemsPromises);

    const cart = await findOrCreateCart({ sessionId, userId });
    cart.items = []
    await cart.save()
    // Return success response
    res
      .status(200)
      .json({ message: "Order created and items added successfully", orderResponse });
  } catch (error) {
    console.error("Error adding items to order:", error.message);
    res.status(500).json({ message: "Failed to add items to the order" });
  }
};

module.exports = {
  createOrder,
};

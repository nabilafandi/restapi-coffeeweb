const { orderCreate, orderAddItems } = require("../../services/olseraApi");

const createOrder = async (req, res) => {
  const items = req.body.items;
  try {
    // Create order
    const orderResponse = await orderCreate();
    const orderId = orderResponse.data.id;

    const addItemsPromises = items.map((item) => {
      const itemProducts = item.isVariant
        ? item.productId + "|" + item.productVariantId
        : item.productId;
      orderAddItems(orderId, itemProducts, item.quantity);
    });

    await Promise.all(addItemsPromises);

    // Return success response
    res.status(200).json({ message: "Order created and items added successfully", orderId });
  } catch (error) {
    console.error("Error adding items to order:", error.message);
    res.status(500).json({ message: "Failed to add items to the order" });
  }
};

module.exports = {
  createOrder,
};

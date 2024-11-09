const {
  fetchProducts,
  fetchProductGroups,
  fetchProductByClassification,
  fetchProductDetails,
} = require("../../services/olseraApi");
const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts();

    return res.status(200).json({ success: true, message: "Successfully fetched products from olsera", data: products, });
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error}`, });
  }
};

const getProductDetails = async (req, res) => {
  const productId = req.params.id;
  try {
    const ProductDetails = await fetchProductDetails(productId);
    return res.status(200).json({ success: true, message: "Successfully fetched product details from olsera", data: ProductDetails, });
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error}`, });
  }
};
const getProductsByClassification = async (req, res) => {
  const classification = req.params.classification;

  try {
    const products = await fetchProductByClassification(classification);

    return res.status(200).json({
      success: true,
      message: "Successfully fetched products from olsera",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching products: ${error}`,
    });
  }
};

const getProductGroups = async (req, res) => {
  try {
    const productGroup = await fetchProductGroups();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched product groups from olsera",
      data: productGroup,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching product groups: ${error}`,
    });
  }
};

module.exports = {
  getProducts,
  getProductDetails,
  getProductGroups,
  getProductsByClassification,
};

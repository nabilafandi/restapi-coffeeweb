const { fetchProducts, fetchProductGroups, fetchProductByClassification } = require('../../services/olseraApi')
const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts()

    return res.status(200).json({ success: true, message: "Successfully fetched products from olsera", data: products });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching products: ${error}`,
    });
  }
}
const getProductsByClassification = async (req, res) => {
  const classification = req.params.classification;
  console.log('classification', classification)

  try {
    const products = await fetchProductByClassification(classification)

    return res.status(200).json({ success: true, message: "Successfully fetched products from olsera", data: products });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching products: ${error}`,
    });
  }
}

const getProductGroups = async (req, res) => {
  try {
    const productGroup = await fetchProductGroups()
    return res.status(200).json({ success: true, message: "Successfully fetched product groups from olsera", data: productGroup });

  } catch (error) {
    res.status(500).json({
      message: `Error fetching product groups: ${error}`,
    });
  }
}

module.exports = {
  getProducts,
  getProductGroups,
  getProductsByClassification,
};

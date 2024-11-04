const axios = require("axios");


const getProducts = async () => {
    try {
      const olseraProducts = await 
        const olseraProducts = await fetchProducts()

        return olseraProducts;
    } catch (error) {
      console.error("Error getting products: ", error);
      throw error
    }
  };
  
module.exports =  {
    getProducts,
} 
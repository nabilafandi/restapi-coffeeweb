require("dotenv").config();
const axios = require("axios");

const {
  OLSERA_ACCESS_TOKEN,
  OLSERA_BASE_URL,
  OLSERA_APP_ID,
  OLSERA_SECRET_KEY,
} = process.env;

// auth
async function createToken() {
  const endPoint = "/token";
  data = {
    app_id: OLSERA_APP_ID,
    secret_key: OLSERA_SECRET_KEY,
    grant_type: "secret_key",
  };

  try {
    const response = await axios.post(OLSERA_BASE_URL + endPoint, data, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to create customer: " +
        error.message +
        "\n" +
        JSON.stringify(error.response.data.error)
    );
  }
}

// customers
async function fetchCustomers() {
  const endPoint = "/customersupplier/customer";
  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
      },
      params: {
        per_page: 100,
        page: 1,
        sort_column: "name",
        sort_type: "asc",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch customers: " +
        error.message +
        "\n" +
        JSON.stringify(error.response.data.error)
    );
  }
}

async function fetchCustomerById(customer_id) {
  const endPoint = "/customersupplier/customer/detail";
  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
      },
      params: {
        id: customer_id,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch customers: " +
        error.message +
        "\n" +
        JSON.stringify(error.response.data.error)
    );
  }
}

async function createCustomer() {
  const endPoint = "/order/openorder";
  data = {
    order_date: new Date().toISOString().slice(0, 10),
    currency_id: "IDR",
    customer_email: "johndoe@domain.com",
    customer_name: "john doe",
    customer_phone: "+6285591539077",
    customer_type_id: "93814",
  };

  try {
    const response = await axios.post(OLSERA_BASE_URL + endPoint, data, {
      headers: {
        Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to create customer: " +
        error.message +
        "\n" +
        JSON.stringify(error.response.data.error)
    );
  }
}

// products
async function fetchProducts() {
  const endPoint = "/product";
  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
      },
      params: {},
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch customers: " +
        error.message +
        "\n" +
        JSON.stringify(error.response.data.error)
    );
  }
}

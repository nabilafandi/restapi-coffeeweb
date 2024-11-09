require("dotenv").config();
const axios = require("axios");
const OlseraToken = require('../models/olseraToken')

const { OLSERA_BASE_URL, OLSERA_APP_ID, OLSERA_SECRET_KEY, } = process.env;
if (!OLSERA_BASE_URL || !OLSERA_APP_ID || !OLSERA_SECRET_KEY) {
  throw new Error("Missing required olsera environment variables.");
}

async function getAccessToken() {
  const olseraApp = await OlseraToken.findOne({ appId: OLSERA_APP_ID })
  if (!olseraApp) throw new Error("getAccessToken error: Olsera App not found.");
  return olseraApp.accessToken
}
async function requestOlsera(endpoint, params = {}, method = "GET", payload = null) {
  const accessToken = await getAccessToken();

  // Prepare the configuration object
  const config = {
    method: method.toUpperCase(),
    url: `${OLSERA_BASE_URL}${endpoint}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    params: method === "GET" ? params : undefined,
    data: method === "POST" ? payload : undefined,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized: Access token may be invalid.");
    }
    throw new Error(
      "Olsera API: Failed to fetch data: " + (error.response?.data?.error || error.message)
    );
  }
}

// products
async function fetchProducts() {
  return requestOlsera("/product");
}
async function fetchProductDetails(productId) {
  const params = {
    "id": Number(productId)
  }
  return requestOlsera("/product/detail",params)
}
async function fetchProductByClassification(classification) {
  const params = {
    "search_column[]": "klasifikasi_id",
    "search_text[]": classification,
    "per_page": 100,
  };
  return requestOlsera("/product", params);
}
async function fetchProductGroups() {
  const params = { "per_page": 100 };
  return requestOlsera("/productgroup", params);
}

// auth
async function createToken() {
  const payload = {
    app_id: OLSERA_APP_ID,
    secret_key: OLSERA_SECRET_KEY,
    grant_type: "secret_key",
  }
  return requestOlsera("/token", {}, "POST", payload);
}
async function refreshToken(refreshToken) {
  const payload = {
    refreshToken,
    grant_type: "refresh_token"
  }
  return requestOlsera("/token", {}, "POST", payload);
}

// customers
async function fetchCustomers() {
  const endPoint = "/customersupplier/customer";
  const accessToken = await getAccessToken()
  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
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

async function fetchCustomersByEmail(email) {
  const endPoint = "/customersupplier/customer";
  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
      },
      params: {
        "search_column[]": "email",
        "search_operator[]": "=",
        "search_text[]": email,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data.error));
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
  const data = {
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

module.exports = {
  createToken,
  refreshToken,
  fetchCustomers,
  fetchCustomerById,
  createCustomer,
  fetchCustomersByEmail,
  fetchProducts,
  fetchProductDetails,
  fetchProductGroups,
  fetchProductByClassification,
};

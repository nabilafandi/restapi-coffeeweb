require("dotenv").config();
const axios = require("axios");
const OlseraToken = require("../models/olseraToken");

const { OLSERA_BASE_URL, OLSERA_APP_ID, OLSERA_SECRET_KEY } = process.env;
if (!OLSERA_BASE_URL || !OLSERA_APP_ID || !OLSERA_SECRET_KEY) {
  throw new Error("Missing required olsera environment variables.");
}

async function getAccessToken() {
  const olseraApp = await OlseraToken.findOne({ appId: OLSERA_APP_ID });
  if (!olseraApp)
    throw new Error("getAccessToken error: Olsera App not found.");
  return olseraApp.accessToken;
}
async function requestOlsera(
  endpoint,
  params = {},
  method = "GET",
  payload = null
) {
  const accessToken = await getAccessToken();

  // Prepare the configuration object
  const config = {
    method: method.toUpperCase(),
    url: `${OLSERA_BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
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
    const errorDetails = error.response?.data?.error
      ? error.response.data.error
      : error.message;
    return { message: "Olsera API: Failed to fetch data", error: errorDetails };
  }
}

// products
async function fetchProducts() {
  return requestOlsera("/product");
}
async function fetchProductDetails(productId) {
  const params = {
    id: Number(productId),
  };
  return requestOlsera("/product/detail", params);
}
async function fetchProductByClassification(classification) {
  const params = {
    "search_column[]": "klasifikasi_id",
    "search_text[]": classification,
    per_page: 100,
  };
  return requestOlsera("/product", params);
}
async function fetchProductGroups() {
  const params = { per_page: 100 };
  return requestOlsera("/productgroup", params);
}

// auth
async function createToken() {
  const payload = {
    app_id: OLSERA_APP_ID,
    secret_key: OLSERA_SECRET_KEY,
    grant_type: "secret_key",
  };
  return requestOlsera("/token", {}, "POST", payload);
}
async function refreshToken(refreshToken) {
  const payload = {
    refreshToken,
    grant_type: "refresh_token",
  };
  return requestOlsera("/token", {}, "POST", payload);
}

// orders
async function orderCreate() {
  const date = new Date(Date.now());
  const formattedDate = date.toISOString().split("T")[0];

  const payload = {
    order_date: formattedDate,
    currency_id: "IDR",
    notes: "pallasweb test order",
    customer_id: undefined,
    customer_email: undefined,
    customer_name: undefined,
    customer_phone: undefined,
  };
  return requestOlsera("/order/openorder", {}, "POST", payload);
}
async function orderAddItems(orderId, item, qty) {
  const payload = {
    order_id: String(orderId),
    item_products: item,
    item_qty: qty,
  };
  return requestOlsera("/order/openorder/additem", {}, "POST", payload);
}

// customers
async function fetchCustomersByEmail(email) {
  const params = {
    "search_column[]": "email",
    "search_operator[]": "=",
    "search_text[]": email,
  };
  return requestOlsera("/customersupplier/customer", params);
}
async function fetchCustomersByPhone(phone) {
  const params = {
    "search_column[]": "phone",
    "search_operator[]": "=",
    "search_text[]": phone,
  };
  return requestOlsera("/customersupplier/customer", params);
}
async function fetchCustomers() {
  const params = {
    per_page: 100,
    page: 1,
    sort_column: "name",
    sort_type: "asc",
  };
  return requestOlsera("/customersupplier/customer", params);
}

async function fetchCustomerById(customer_id) {
  const params = {
    id: customer_id,
  };
  return requestOlsera("/customersupplier/customer/detail", params);
}

async function createCustomerByOrder(data) {
  const date = new Date(Date.now());
  const formattedDate = date.toISOString().split("T")[0];

  const payload = {
    order_date: formattedDate,
    currency_id: "IDR",
    notes: "User Creation by Order",
    customer_email: data.email,
    customer_type_id: "93814",
    customer_name: data.name,
    customer_phone: data.phone,
  };
  return requestOlsera("/order/openorder", {}, "POST", payload);
}
async function updateCustomerByOrder(id,data) {
  const date = new Date(Date.now());
  const formattedDate = date.toISOString().split("T")[0];

  const payload = {
    order_date: formattedDate,
    currency_id: "IDR",
    notes: "User Update by Order",
    customer_id: id,
    customer_email: data.email,
    customer_name: data.name,
    customer_phone: data.phone,
  };
  return requestOlsera("/order/openorder", {}, "POST", payload);
}

async function createCustomer(data) {
  const date = new Date(Date.now());
  const formattedDate = date.toISOString().split("T")[0];
  const payload = {
    currency_id: "IDR",
    email: data.email,
    name: data.name,
    phone: data.phone,
    gender: data.gender || 'm',
    country_id: 'id',
    customer_type_id: "93814",
    password: "qwe123"
  };
  return requestOlsera("/customersupplier/customer", {}, "POST", payload);
}
async function cancelOrder(orderId) {
  const payload = {
    order_id: String(orderId),
    status: "X",
  };
  return requestOlsera("/order/openorder/updatestatus", {}, "POST", payload);
}

// async function createCustomer() {
//   const endPoint = "/order/openorder";
//   const data = {
//     order_date: new Date().toISOString().slice(0, 10),
//     currency_id: "IDR",
//     customer_email: "johndoe@domain.com",
//     customer_name: "john doe",
//     customer_phone: "+6285591539077",
//     customer_type_id: "93814",
//   };

//   try {
//     const response = await axios.post(OLSERA_BASE_URL + endPoint, data, {
//       headers: {
//         Authorization: "Bearer " + OLSERA_ACCESS_TOKEN,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       "Failed to create customer: " +
//         error.message +
//         "\n" +
//         JSON.stringify(error.response.data.error)
//     );
//   }
// }

module.exports = {
  createToken,
  refreshToken,
  orderCreate,
  orderAddItems,
  fetchCustomers,
  fetchCustomerById,
  createCustomer,
  fetchCustomersByEmail,
  fetchCustomersByPhone,
  fetchProducts,
  fetchProductDetails,
  fetchProductGroups,
  fetchProductByClassification,
  cancelOrder,
  createCustomerByOrder,
  updateCustomerByOrder,
};

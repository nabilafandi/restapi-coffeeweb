require("dotenv").config();
const axios = require("axios");
const OlseraToken = require('../models/olseraToken')

const {
  OLSERA_BASE_URL,
  OLSERA_APP_ID,
  OLSERA_SECRET_KEY,
} = process.env;

async function getAccessToken() {
  const olseraApp = await OlseraToken.findOne({ appId: OLSERA_APP_ID })
  return olseraApp.accessToken
}


// auth
async function createToken() {
  const endPoint = "/token";
  const data = {
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
async function refreshToken(refresh_token) {
  const endPoint = "/token";
  const data = {
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  };

  console.log('service olserapi')
  try {
    console.log("data", data)
    const response = await axios.post(OLSERA_BASE_URL + endPoint, data, {});
    return response.data
  } catch (error) {
    // throw {"errornabil": error}
    // console.log("error.response nabil", error.response)
    const statusCode = error.response?.data?.error?.status_code;
    console.log(statusCode)
    if (statusCode === 401) {
      throw { message: 'Invalid refresh token, please re-authenticate', status: 401 };
    } else {
      throw { message: "error", status: statusCode || 500 };
    }

  }



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

// products
async function fetchProducts() {
  const endPoint = "/product";
  const accessToken = await getAccessToken()

  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error)
    throw new Error(
      "Olsera API: Failed to fetch data: " + error.response.data.error
    );
  }
}
async function fetchProductByClassification(classification) {
  const endPoint = "/product";
  const accessToken = await getAccessToken()

  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        "search_column[]": "klasifikasi_id",
        "search_text[]": classification,
        "per_page": 100
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.error)
    throw new Error(
      "Olsera API: Failed to fetch data: " + error.response.data.error
    );
  }
}
async function fetchProductGroups() {
  const endPoint = "/productgroup";
  const accessToken = await getAccessToken()

  try {
    const response = await axios.get(OLSERA_BASE_URL + endPoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        "per_page": 100
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error)
    throw new Error(
      "Olsera API: Failed to fetch data: " + error.response.data.error
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
  fetchProductGroups,
  fetchProductByClassification,
};

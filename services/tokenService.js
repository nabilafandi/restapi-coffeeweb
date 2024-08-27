const Token = require("../models/token");

const saveTokens = async (tokenData) => {
  try {
    const newToken = await Token.create(tokenData);
    return newToken;
  } catch (error) {
    console.error("Error storing token: ", error);
  }
};

const getLatestToken = async () => {
  try {
    const token = await Token.findOne().sort({ created_at: -1 });
    return token;
  } catch (error) {
    console.error("Error fetching token: ", error);
  }
};

module.exports = {
  saveTokens,
  getLatestToken,
};

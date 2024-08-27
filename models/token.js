const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token_type: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expires_refresh_token: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: "30d", // Optional: auto-delete document after 30 days
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;

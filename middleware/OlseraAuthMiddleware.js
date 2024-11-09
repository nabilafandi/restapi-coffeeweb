const dotenv = require("dotenv");
const { createToken, refreshToken } = require("../services/olseraApi");
const OlseraToken = require("../models/olseraToken");
dotenv.config();

async function getTokenMiddleware(req, res, next) {
  try {
    const olseraApp = await OlseraToken.findOne({ appId: process.env.OLSERA_APP_ID });
    if (!olseraApp) {
      return res.status(500).json({ error: "Olsera app configuration not found" });
    }

    // Check if access token is missing or expired
    if (!olseraApp.accessToken || Date.now() >= olseraApp.expiryTime) {
      // Try refreshing the token
      const tokenUpdated = await updateTokens(olseraApp, 'refresh');
      if (!tokenUpdated && await updateTokens(olseraApp, 'create')) {
        req.headers["Authorization"] = `Bearer ${olseraApp.accessToken}`;
        return next();
      } else if (!tokenUpdated) {
        return res.status(401).json({ error: "Failed to refresh or recreate token" });
      }
    }

    // Check if refresh token is missing or expired
    if (!olseraApp.refreshToken || Date.now() >= olseraApp.refreshTokenexpiryTime) {
      const tokenUpdated = await updateTokens(olseraApp, 'create');
      if (!tokenUpdated) {
        return res.status(401).json({ error: "Failed to recreate token" });
      }
    }

    // Set the access token in request headers
    req.headers["Authorization"] = `Bearer ${olseraApp.accessToken}`;
    next();

  } catch (error) {
    console.error("Error in getTokenMiddleware:", error);
    next(error); // Forward error to an error-handling middleware
  }
}

// Reusable function for token update
async function updateTokens(olseraApp, method) {
  try {
    const response = method === 'refresh'
      ? await refreshToken(olseraApp.refreshToken)
      : await createToken();

    // Update token values and save to database
    olseraApp.accessToken = response.access_token;
    olseraApp.refreshToken = response.refresh_token;
    olseraApp.expiryTime = Date.now() + response.expires_in * 1000;
    olseraApp.refreshTokenexpiryTime = Date.now() + response.expires_refresh_token * 1000;

    await olseraApp.save();
    console.log(`${method === 'refresh' ? "Access" : "New"} token obtained successfully!`);
    return true;

  } catch (error) {
    console.error(`Failed to ${method} token:`, error.message);
    return false; // Indicate failure to the calling function
  }
}

module.exports = getTokenMiddleware;

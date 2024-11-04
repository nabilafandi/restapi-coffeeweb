const { createToken, refreshToken } = require('../services/olseraApi');
const OlseraToken = require('../models/olseraToken');

async function getTokenMiddleware(req, res, next) {
  try {
    const olseraApp = await OlseraToken.findOne({ appId: "ocfyhNvPX6gDSmkkEpMi" });

    if (!olseraApp) {
      console.log('Olsera app not found');
      return res.status(500).json({ error: 'Internal server error' }); 
    }

    if (!olseraApp.accessToken || Date.now() >= olseraApp.expiryTime) {
      console.log('need to refresh token')
      await refreshTokenMiddleware(req, res, next);
      return; // Important: Stop execution here after refreshing
    }


    req.headers['Authorization'] = `Bearer ${olseraApp.accessToken}`;
    next();

  } catch (error) {
    console.error('Error in getTokenMiddleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function refreshTokenMiddleware(req, res, next) {
  try {
    const olseraApp = await OlseraToken.findOne({ appId: "ocfyhNvPX6gDSmkkEpMi" });

    if (!olseraApp) {
      console.log('Olsera app not found');
      return res.status(500).json({ error: 'Internal server error' }); 
    }

    const response = await refreshToken(olseraApp.refreshToken);
    console.log("Response from refreshMiddleware:", response);

    olseraApp.accessToken = response.access_token;
    olseraApp.refreshToken = response.refresh_token;
    olseraApp.expiryTime = Date.now() + response.expires_refresh_token * 1000;

    // Save the updated document
    await olseraApp.save(); 

    console.log('Access token refreshed!');
    next();

  } catch (error) {
    console.error('Failed to refresh token:', error.message);
    res.status(401).json({ error: 'Unauthorized, failed to refresh token' });
  }
}

module.exports = getTokenMiddleware;
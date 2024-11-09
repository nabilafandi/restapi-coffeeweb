const OlseraToken = require('../../models/olseraToken')
const {createToken} = require('../../services/olseraApi')

const recreateToken = async (req, res) => {
  try {
    const olseraTokenModel = await OlseraToken.findOne({});

    const responseCreateToken = await createToken()
    olseraTokenModel.refreshToken = responseCreateToken.refresh_token
    olseraTokenModel.accessToken = responseCreateToken.access_token
    olseraTokenModel.expiryTime = new Date(Date.now() + responseCreateToken.expires_in * 1000)  
    olseraTokenModel.refreshTokenexpiryTime = new Date(Date.now() + responseCreateToken.expires_refresh_token * 1000)   

    await olseraTokenModel.save();
    const updatedTokenModel = await OlseraToken.findOne({})
    res.status(200).json(updatedTokenModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


module.exports = {
  recreateToken
};

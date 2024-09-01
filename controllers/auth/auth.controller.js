const aboutService = require("../../services/aboutService");

const getAboutDetail = async (req, res) => {
  try {
    const getAbout = await aboutService.getAboutByName(req.params.data_id);
    res.status(200).json({ success: true, message: "Success fetching data", data:getAbout });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data: ${error}`,
    });
  }
};

const createAbout = async (req, res) => {
  try {
    const createAbout = await aboutService.createAbout(req.body);
    res.status(201).json({ success: true, message: "About created successfully", data:createAbout });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data: ${error}`,
    });
  }
};

module.exports = {
  getAboutDetail,
  createAbout,
};

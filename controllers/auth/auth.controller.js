const authService = require("../../services/authService")


const createUser = async (req, res) => {
  try {
    const createUser = await authService.createUser(req.body.email);
    res.status(201).json({ success: true, message: "About created successfully", data:createUser });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data: ${error}`,
    });
  }
};

module.exports = {
  createUser,
};

const authService = require("../../services/authService")


const createUser = async (req, res) => {
  const customerData = {
    "email": req.body.email,
    "phone": req.body.phone,
    "password": req.body.password,
    "name": req.body.name,
  }
  try {
    const createUser = await authService.createUser(customerData);

    res.status(201).json({ success: true, message: "User created successfully", data:createUser });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data: ${error}`,
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const allUser = await authService.getUserList()
    res.status(201).json({ success: true, message: "Successfully fetched users", data:allUser });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data: ${error}`,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
};

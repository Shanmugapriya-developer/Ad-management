const asyncHandler = require("../../utils/asyncHandler");
const userService = require("./service");

const register = asyncHandler(async (req, res) => {
  const data = await userService.registerUser(req.body);
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: data.user,
  });
});

const login = asyncHandler(async (req, res) => {
  const data = await userService.loginUser(req.body);
  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: data.user,
  });
});

module.exports = {
  register,
  login,
};

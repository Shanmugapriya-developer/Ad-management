const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const screensService = require("./service");

const addScreen = asyncHandler(async (req, res) => {
  const data = await screensService.addScreen(req.body);
  return successResponse(res, "Screen added successfully", data, 201);
});

const getScreensByTheater = asyncHandler(async (req, res) => {
  const data = await screensService.listScreensByTheater(req.params.theaterId);
  return successResponse(res, "Screens fetched successfully", data);
});

module.exports = {
  addScreen,
  getScreensByTheater,
};

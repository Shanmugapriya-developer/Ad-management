const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const theaterService = require("./service");

const addTheater = asyncHandler(async (req, res) => {
  const data = await theaterService.addTheater(req.body, req.user);
  return successResponse(res, "Theater added successfully", data, 201);
});

const getAllTheaters = asyncHandler(async (req, res) => {
  const data = await theaterService.listTheaters();
  return successResponse(res, "Theaters fetched successfully", data);
});

const getTheatersByOwner = asyncHandler(async (req, res) => {
  const data = await theaterService.listTheatersByOwner(req.params.ownerId, req.user);
  return successResponse(res, "Owner theaters fetched successfully", data);
});

module.exports = {
  addTheater,
  getAllTheaters,
  getTheatersByOwner,
};

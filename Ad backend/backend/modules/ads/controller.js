const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const adsService = require("./service");

const createAd = asyncHandler(async (req, res) => {
  const data = await adsService.createAd(req.body, req.user);
  return successResponse(res, "Ad created successfully", data, 201);
});

const getAllAds = asyncHandler(async (req, res) => {
  const data = await adsService.listAds();
  return successResponse(res, "Ads fetched successfully", data);
});

module.exports = {
  createAd,
  getAllAds,
};

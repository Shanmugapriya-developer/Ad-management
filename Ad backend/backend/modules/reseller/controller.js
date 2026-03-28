const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const resellerService = require("./service");

const buyAd = asyncHandler(async (req, res) => {
  const data = await resellerService.buyAd(req.body, req.user);
  return successResponse(res, "Reseller buy transaction created successfully", data, 201);
});

const sellAd = asyncHandler(async (req, res) => {
  const data = await resellerService.sellAd(req.body, req.user);
  return successResponse(res, "Reseller sell transaction created successfully", data, 201);
});

const calculateCommission = asyncHandler(async (req, res) => {
  const data = await resellerService.calculateCommission(req.body);
  return successResponse(res, "Commission calculated successfully", data);
});

module.exports = {
  buyAd,
  sellAd,
  calculateCommission,
};

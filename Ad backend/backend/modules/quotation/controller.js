const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const quotationService = require("./service");

const createQuotation = asyncHandler(async (req, res) => {
  const data = await quotationService.sendQuotation(req.body, req.user);
  return successResponse(res, "Quotation sent successfully", data, 201);
});

const respondToQuotation = asyncHandler(async (req, res) => {
  const data = await quotationService.respondToQuotation(req.params.quotationId, req.body.status);
  return successResponse(res, "Quotation updated successfully", data);
});

module.exports = {
  createQuotation,
  respondToQuotation,
};

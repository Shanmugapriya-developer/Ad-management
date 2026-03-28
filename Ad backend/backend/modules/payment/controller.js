const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const paymentService = require("./service");

const createPayment = asyncHandler(async (req, res) => {
  const data = await paymentService.createPaymentEntry(req.body, req.user);
  return successResponse(res, "Payment entry created successfully", data, 201);
});

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const data = await paymentService.updateStatus(req.params.paymentId, req.body.status);
  return successResponse(res, "Payment status updated successfully", data);
});

module.exports = {
  createPayment,
  updatePaymentStatus,
};

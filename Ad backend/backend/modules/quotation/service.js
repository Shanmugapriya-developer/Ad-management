const ApiError = require("../../utils/apiError");
const { ensureRequiredFields } = require("../../utils/validators");
const quotationModel = require("./model");

const sendQuotation = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["booking_id", "amount"]);

  const result = await quotationModel.createQuotation({
    bookingId: payload.booking_id,
    adminId: currentUser.id,
    amount: payload.amount,
    message: payload.message || null,
    status: "sent",
  });

  return result.rows[0];
};

const respondToQuotation = async (quotationId, status) => {
  ensureRequiredFields({ status }, ["status"]);

  if (!["accepted", "rejected"].includes(status)) {
    throw new ApiError(400, "Status must be accepted or rejected");
  }

  const result = await quotationModel.updateQuotationStatus(quotationId, status);
  const quotation = result.rows[0];

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  return quotation;
};

module.exports = {
  sendQuotation,
  respondToQuotation,
};

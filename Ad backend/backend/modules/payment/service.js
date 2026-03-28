const ApiError = require("../../utils/apiError");
const { ensureRequiredFields } = require("../../utils/validators");
const paymentModel = require("./model");

const createPaymentEntry = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["booking_id", "quotation_id", "amount"]);

  const result = await paymentModel.createPayment({
    bookingId: payload.booking_id,
    quotationId: payload.quotation_id,
    userId: currentUser.id,
    amount: payload.amount,
    paymentMethod: payload.payment_method || "qr",
    transactionRef: payload.transaction_ref || null,
    qrReference: payload.qr_reference || `QR-${Date.now()}`,
    status: payload.status || "pending",
  });

  return result.rows[0];
};

const updateStatus = async (paymentId, status) => {
  ensureRequiredFields({ status }, ["status"]);

  const result = await paymentModel.updatePaymentStatus(paymentId, status);
  const payment = result.rows[0];

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  return payment;
};

module.exports = {
  createPaymentEntry,
  updateStatus,
};

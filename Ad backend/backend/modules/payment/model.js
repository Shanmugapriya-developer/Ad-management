const db = require("../../config/db");

const createPayment = async ({
  bookingId,
  quotationId,
  userId,
  amount,
  paymentMethod,
  transactionRef,
  qrReference,
  status,
}) =>
  db.query(
    `INSERT INTO payments (booking_id, quotation_id, user_id, amount, payment_method, transaction_ref, qr_reference, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [bookingId, quotationId, userId, amount, paymentMethod, transactionRef, qrReference, status]
  );

const updatePaymentStatus = async (paymentId, status) =>
  db.query(
    `UPDATE payments
     SET status = $2,
         paid_at = CASE WHEN $2 = 'paid' THEN NOW() ELSE paid_at END,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [paymentId, status]
  );

module.exports = {
  createPayment,
  updatePaymentStatus,
};

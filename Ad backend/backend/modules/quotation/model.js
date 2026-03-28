const db = require("../../config/db");

const createQuotation = async ({ bookingId, adminId, amount, message, status }) =>
  db.query(
    `INSERT INTO quotations (booking_id, admin_id, amount, message, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [bookingId, adminId, amount, message, status]
  );

const updateQuotationStatus = async (quotationId, status) =>
  db.query(
    `UPDATE quotations
     SET status = $2, responded_at = NOW(), updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [quotationId, status]
  );

module.exports = {
  createQuotation,
  updateQuotationStatus,
};

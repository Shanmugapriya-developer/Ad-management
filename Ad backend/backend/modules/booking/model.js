const db = require("../../config/db");

const createBooking = async ({ userId, adId, theaterId, screenId, startDate, endDate, status, notes }) =>
  db.query(
    `INSERT INTO bookings (user_id, ad_id, theater_id, screen_id, start_date, end_date, status, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId, adId, theaterId, screenId, startDate, endDate, status, notes]
  );

const getBookingsByUser = async (userId) =>
  db.query(
    `SELECT b.*, a.title AS ad_title, t.name AS theater_name, s.name AS screen_name
     FROM bookings b
     LEFT JOIN ads a ON a.id = b.ad_id
     LEFT JOIN theaters t ON t.id = b.theater_id
     LEFT JOIN screens s ON s.id = b.screen_id
     WHERE b.user_id = $1
     ORDER BY b.id DESC`,
    [userId]
  );

const updateBookingStatus = async (bookingId, status) =>
  db.query(
    `UPDATE bookings
     SET status = $2, updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [bookingId, status]
  );

module.exports = {
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
};

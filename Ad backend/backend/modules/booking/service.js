const ApiError = require("../../utils/apiError");
const { ensureRequiredFields } = require("../../utils/validators");
const bookingModel = require("./model");

const createBookingRequest = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["ad_id", "theater_id", "screen_id", "start_date", "end_date"]);

  const result = await bookingModel.createBooking({
    userId: currentUser.id,
    adId: payload.ad_id,
    theaterId: payload.theater_id,
    screenId: payload.screen_id,
    startDate: payload.start_date,
    endDate: payload.end_date,
    status: payload.status || "pending",
    notes: payload.notes || null,
  });

  return result.rows[0];
};

const listBookingsByUser = async (userId, currentUser) => {
  if (currentUser.role !== "admin" && String(currentUser.id) !== String(userId)) {
    throw new ApiError(403, "You can only view your own bookings");
  }

  const result = await bookingModel.getBookingsByUser(userId);
  return result.rows;
};

const updateStatus = async (bookingId, status) => {
  ensureRequiredFields({ status }, ["status"]);
  const result = await bookingModel.updateBookingStatus(bookingId, status);
  const booking = result.rows[0];

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

module.exports = {
  createBookingRequest,
  listBookingsByUser,
  updateStatus,
};

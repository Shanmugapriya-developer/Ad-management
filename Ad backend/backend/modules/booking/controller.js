const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const bookingService = require("./service");

const createBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.createBookingRequest(req.body, req.user);
  return successResponse(res, "Booking request created successfully", data, 201);
});

const getBookingsByUser = asyncHandler(async (req, res) => {
  const data = await bookingService.listBookingsByUser(req.params.userId, req.user);
  return successResponse(res, "Bookings fetched successfully", data);
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const data = await bookingService.updateStatus(req.params.bookingId, req.body.status);
  return successResponse(res, "Booking status updated successfully", data);
});

module.exports = {
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
};

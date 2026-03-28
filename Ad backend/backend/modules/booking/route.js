const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/", authenticate, controller.createBooking);
router.get("/user/:userId", authenticate, controller.getBookingsByUser);
router.patch("/:bookingId/status", authenticate, authorize("admin", "theater_owner"), controller.updateBookingStatus);

module.exports = router;

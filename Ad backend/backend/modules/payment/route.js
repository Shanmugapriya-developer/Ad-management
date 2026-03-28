const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/", authenticate, controller.createPayment);
router.patch("/:paymentId/status", authenticate, authorize("admin"), controller.updatePaymentStatus);

module.exports = router;

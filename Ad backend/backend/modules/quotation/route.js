const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/", authenticate, authorize("admin"), controller.createQuotation);
router.patch("/:quotationId/respond", authenticate, controller.respondToQuotation);

module.exports = router;

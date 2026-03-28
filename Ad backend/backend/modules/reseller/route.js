const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/buy", authenticate, authorize("reseller"), controller.buyAd);
router.post("/sell", authenticate, authorize("reseller"), controller.sellAd);
router.post("/commission", authenticate, authorize("reseller", "admin"), controller.calculateCommission);

module.exports = router;

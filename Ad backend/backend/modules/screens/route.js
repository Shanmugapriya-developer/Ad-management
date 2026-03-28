const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/", authenticate, authorize("admin", "theater_owner"), controller.addScreen);
router.get("/theater/:theaterId", controller.getScreensByTheater);

module.exports = router;

const express = require("express");
const controller = require("./controller");
const { authenticate, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/", authenticate, authorize("admin", "theater_owner"), controller.addTheater);
router.get("/", controller.getAllTheaters);
router.get("/owner/:ownerId", authenticate, controller.getTheatersByOwner);

module.exports = router;

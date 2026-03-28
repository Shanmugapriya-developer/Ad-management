const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const db = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const modules = [
  require("./modules/user/module"),
  require("./modules/theater/module"),
  require("./modules/screens/module"),
  require("./modules/ads/module"),
  require("./modules/booking/module"),
  require("./modules/quotation/module"),
  require("./modules/payment/module"),
  require("./modules/reseller/module"),
];

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", async (req, res) => {
  let dbStatus = "disconnected";

  try {
    await db.query("SELECT 1");
    dbStatus = "connected";
  } catch (error) {
    dbStatus = "unavailable";
  }

  return res.json({
    success: true,
    message: "Ad Management System backend is running",
    data: {
      dbStatus,
      sampleRoutes: [
        "POST /api/users/register",
        "POST /api/users/login",
        "POST /api/theaters",
        "GET /api/theaters",
        "POST /api/screens",
        "GET /api/screens/theater/:theaterId",
        "POST /api/ads",
        "GET /api/ads",
        "POST /api/bookings",
        "PATCH /api/bookings/:bookingId/status",
        "POST /api/quotations",
        "PATCH /api/quotations/:quotationId/respond",
        "POST /api/payments",
        "PATCH /api/payments/:paymentId/status",
        "POST /api/resellers/buy",
        "POST /api/resellers/sell",
        "POST /api/resellers/commission"
      ],
    },
  });
});

modules.forEach((moduleEntry) => {
  app.use(moduleEntry.basePath, moduleEntry.router);
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

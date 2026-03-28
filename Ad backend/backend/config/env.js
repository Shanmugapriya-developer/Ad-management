const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "secret123",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
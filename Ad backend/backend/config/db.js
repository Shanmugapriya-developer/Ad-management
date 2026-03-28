const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
    })
  : new Pool({
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "ad_management",
      password: process.env.DB_PASSWORD || "priya",
      port: Number(process.env.DB_PORT) || 5432,
    });

pool.on("error", (err) => {
  console.error("Unexpected database error:", err.message);
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });

module.exports = pool;

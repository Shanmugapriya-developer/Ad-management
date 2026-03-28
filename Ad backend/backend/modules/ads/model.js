const db = require("../../config/db");

const createAd = async ({ title, description, mediaUrl, budget, status, createdBy, startDate, endDate }) =>
  db.query(
    `INSERT INTO ads (title, description, media_url, budget, status, created_by, start_date, end_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [title, description, mediaUrl, budget, status, createdBy, startDate, endDate]
  );

const getAllAds = async () =>
  db.query(
    `SELECT a.*, u.name AS created_by_name
     FROM ads a
     LEFT JOIN users u ON u.id = a.created_by
     ORDER BY a.id DESC`
  );

module.exports = {
  createAd,
  getAllAds,
};

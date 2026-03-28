const db = require("../../config/db");

const createTheater = async ({ name, location, ownerId }) =>
  db.query(
    `INSERT INTO theaters (name, location, owner_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, location, ownerId]
  );

const getAllTheaters = async () =>
  db.query(
    `SELECT t.*, u.name AS owner_name, u.mobile AS owner_mobile
     FROM theaters t
     LEFT JOIN users u ON u.id = t.owner_id
     ORDER BY t.id DESC`
  );

const getTheatersByOwner = async (ownerId) =>
  db.query(
    `SELECT *
     FROM theaters
     WHERE owner_id = $1
     ORDER BY id DESC`,
    [ownerId]
  );

module.exports = {
  createTheater,
  getAllTheaters,
  getTheatersByOwner,
};

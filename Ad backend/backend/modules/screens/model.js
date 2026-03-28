const db = require("../../config/db");

const createScreen = async ({ theaterId, name, screenType, capacity }) =>
  db.query(
    `INSERT INTO screens (theater_id, name, screen_type, capacity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [theaterId, name, screenType, capacity]
  );

const getScreensByTheater = async (theaterId) =>
  db.query(
    `SELECT *
     FROM screens
     WHERE theater_id = $1
     ORDER BY id DESC`,
    [theaterId]
  );

module.exports = {
  createScreen,
  getScreensByTheater,
};

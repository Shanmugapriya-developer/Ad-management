const db = require("../../config/db");

const ensureUsersTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      mobile VARCHAR(15) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user'
    )
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS mobile VARCHAR(15)
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS password TEXT
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'
  `);

  await db.query(`
    UPDATE users
    SET role = 'user'
    WHERE role IS NULL
  `);

  await db.query(`
    ALTER TABLE users
    ALTER COLUMN role SET DEFAULT 'user'
  `);
};

const createUser = async ({ mobile, password, role }) => {
  await ensureUsersTable();

  return db.query(
    `INSERT INTO users (mobile, password, role)
     VALUES ($1, $2, $3)
     RETURNING id, mobile, role`,
    [mobile, password, role]
  );
};

const findByMobile = async (mobile) => {
  await ensureUsersTable();

  return db.query(
    `SELECT id, mobile, password, role
     FROM users
     WHERE mobile = $1`,
    [mobile]
  );
};

module.exports = {
  createUser,
  findByMobile,
};

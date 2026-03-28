const pool = require("./pool");

const getUserFromId = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM "user"
    WHERE id = $1;
    `,
    [userId]
  );
  return rows[0];
};

const getUserFromUsername = async (username) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM "user"
    WHERE username ILIKE $1;
    `,
    [username]
  );
  return rows[0];
};

const getAllMessages = async () => {
  const { rows } = await pool.query(
    `
    SELECT * FROM "message"
    JOIN "user" ON "message".user_id = "user".id
    ORDER BY "message".timestamp DESC;
    `
  );
  return rows;
};

const addUser = async ({ firstName, lastName, username, password }) => {
  await pool.query(
    `
    INSERT INTO "user" (first_name, last_name, username, password)
    VALUES
      ($1, $2, $3, $4);
    `,
    [firstName, lastName, username, password]
  );
};

const grantMembership = async (userId) => {
  await pool.query(
    `
    UPDATE "user"
    SET member = TRUE
    WHERE id = $1;
    `,
    [userId]
  );
};

const grantAdmin = async (userId) => {
  await pool.query(
    `
    UPDATE "user"
    SET admin = TRUE
    WHERE id = $1;
    `,
    [userId]
  );
};

const createMessage = async ({ title, body, userId }) => {
  await pool.query(
    `
    INSERT INTO "message" (title, body, user_id)
    VALUES
      ($1, $2, $3);
    `,
    [title, body, userId]
  );
};

const deleteMessage = async (messageId) => {
  await pool.query(
    `
    DELETE FROM "message"
    WHERE id = $1;
    `,
    [messageId]
  );
};

module.exports = {
  getUserFromId,
  getUserFromUsername,
  getAllMessages,
  addUser,
  grantMembership,
  grantAdmin,
  createMessage,
  deleteMessage,
};

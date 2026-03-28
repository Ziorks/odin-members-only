require("dotenv").config();
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const pool = require("../db/pool");

module.exports = session({
  store: new pgStore({ pool }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});

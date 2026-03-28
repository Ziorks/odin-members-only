const { validationResult } = require("express-validator");
const {
  validateMembership,
  validateAdmin,
  validateMessage,
} = require("../utilities/validators");
const db = require("../db/queries");

const messageFormGet = (req, res) => {
  res.render("new-message");
};

const messageFormPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new-message", { errors: errors.array() });
    }

    const { title, body } = req.body;
    const userId = req.user.id;
    await db.createMessage({ title, body, userId });
    res.redirect("/");
  },
];

const membershipFormGet = (req, res) => {
  res.render("membership");
};

const membershipFormPost = [
  validateMembership,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("membership", { errors: errors.array() });
    }

    await db.grantMembership(req.user.id);
    res.redirect("/membership");
  },
];

const adminFormGet = (req, res) => {
  res.render("admin");
};

const adminFormPost = [
  validateAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("admin", { errors: errors.array() });
    }

    await db.grantAdmin(req.user.id);
    res.redirect("/admin");
  },
];

const logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  messageFormGet,
  messageFormPost,
  membershipFormGet,
  membershipFormPost,
  adminFormGet,
  adminFormPost,
  logoutGet,
};

const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
const { validateUser } = require("../utilities/validators");
const { hidifyMessages } = require("../utilities/helperFunctions");
const db = require("../db/queries");

const indexGet = async (req, res) => {
  const messages = await db.getAllMessages();
  if (!req.isAuthenticated() || (!req.user.member && !req.user.admin)) {
    const hiddenMessages = hidifyMessages(messages);
    return res.render("index", { messages: hiddenMessages });
  }
  res.render("index", { messages });
};

const signupFormGet = (req, res) => {
  res.render("sign-up");
};

const signupFormPost = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }

    const { firstName, lastName, username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
        await db.addUser({
          firstName,
          lastName,
          username,
          password: hashedPassword,
        });
        return res.redirect("/");
      } catch (err) {
        return next(err);
      }
    });
  },
];

const loginFormGet = (req, res) => {
  res.render("login");
};

const loginFormPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
});

module.exports = {
  indexGet,
  signupFormGet,
  signupFormPost,
  loginFormGet,
  loginFormPost,
};

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const validateSignup = [
  body("firstname").trim(),
  body("lastname").trim(),
  body("username").trim(),
  body("password"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

//name convention <rootPath><thing><httpVerb>
function indexGet(req, res) {
  res.render("index", { title: "Homepage" });
}

function indexSignupGet(req, res) {
  res.render("signup", { title: "Sign Up" });
}

const indexSignupPost = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("signup", { title: "Sign Up", errors: errors.array() });
    }
    const { firstname, lastname, username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
        await db.createUser(firstname, lastname, username, hashedPassword);
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    });
  },
];

module.exports = { indexGet, indexSignupGet, indexSignupPost };

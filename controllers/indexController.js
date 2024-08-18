const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const maxLengthMessage = "can't be longer than 255 characters.";
const alphaMessage = "can only contain letters.";

const validateSignup = [
  body("firstname")
    .trim()
    .isLength({ max: 255 })
    .withMessage("First name " + maxLengthMessage)
    .isAlpha()
    .withMessage("First name " + alphaMessage),
  body("lastname")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Last name " + maxLengthMessage)
    .isAlpha()
    .withMessage("Last name " + alphaMessage),
  body("username")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Username " + maxLengthMessage)
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username already in use.");
      }
    }),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long."),
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

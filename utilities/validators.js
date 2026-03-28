require("dotenv").config();
const { body } = require("express-validator");
const db = require("../db/queries");

const lengthMsg = "can't exceed 255 characters.";
const alphaMsg = "must only contain letters.";
const alphanumericMsg = "can only contain letters and numbers.";

const validateUser = [
  body("firstName")
    .trim()
    .isLength({ max: 255 })
    .withMessage("First name " + lengthMsg)
    .isAlpha()
    .withMessage("First name " + alphaMsg),
  body("lastName")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Last name " + lengthMsg)
    .isAlpha()
    .withMessage("Last name " + alphaMsg),
  body("username")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Username " + lengthMsg)
    .isAlphanumeric()
    .withMessage("Username " + alphanumericMsg)
    .custom(async (input) => {
      const user = await db.getUserFromUsername(input);
      if (user) {
        throw new Error("Username taken.");
      }
    }),
  body("password")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Password " + lengthMsg),
  body("passwordConfirmation")
    .trim()
    .custom((input, { req }) => {
      return input == req.body.password;
    })
    .withMessage("Passwords don't match."),
];

const validateMembership = [
  body("membershipSecret")
    .trim()
    .equals(process.env.MEMBERSHIP_SECRET)
    .withMessage("That's not it.  (Try 'koopas')"),
];

const validateAdmin = [
  body("adminSecret")
    .trim()
    .equals(process.env.ADMIN_SECRET)
    .withMessage("Nope."),
];

const validateMessage = [
  body("title")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Title " + lengthMsg),
  body("body").trim(),
];

module.exports = {
  validateUser,
  validateMembership,
  validateAdmin,
  validateMessage,
};

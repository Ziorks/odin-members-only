const { Router } = require("express");
const {
  indexGet,
  signupFormGet,
  signupFormPost,
  loginFormGet,
  loginFormPost,
} = require("../controllers/indexController");

const router = Router();

router.get("/", indexGet);
router.route("/sign-up").get(signupFormGet).post(signupFormPost);
router.route("/login").get(loginFormGet).post(loginFormPost);

module.exports = router;

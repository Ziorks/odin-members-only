const { Router } = require("express");
const {
  messageFormGet,
  messageFormPost,
  membershipFormGet,
  membershipFormPost,
  adminFormGet,
  adminFormPost,
  logoutGet,
} = require("../controllers/userController");
const { isAuth } = require("../utilities/customMiddleware");

const router = Router();

router.use(isAuth);

router.route("/new-message").get(messageFormGet).post(messageFormPost);
router.route("/membership").get(membershipFormGet).post(membershipFormPost);
router.route("/admin").get(adminFormGet).post(adminFormPost);
router.get("/logout", logoutGet);

module.exports = router;

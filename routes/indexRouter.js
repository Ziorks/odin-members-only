const { Router } = require("express");
const indexController = require("../controllers/indexController");

const router = Router();

router.get("/", indexController.indexGet);

router
  .route("/signup")
  .get(indexController.indexSignupGet)
  .post(indexController.indexSignupPost);

router
  .route("/login")
  .get(indexController.indexLoginGet)
  .post(indexController.indexLoginPost);

router
  .route("/membership")
  .get(indexController.indexMembershipGet)
  .post(indexController.indexMembershipPost);

router
  .route("/admin")
  .get(indexController.indexAdminGet)
  .post(indexController.indexAdminPost);

router.get("/logout", indexController.indexLogoutGet);

router
  .route("/message")
  .get(indexController.indexMessageGet)
  .post(indexController.indexMessagePost);

router
  .route("/message/:id")
  .get(indexController.indexDeleteMessageGet)
  .post(indexController.indexDeleteMessagePost);

module.exports = router;

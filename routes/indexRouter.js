const { Router } = require("express");
const indexController = require("../controllers/indexController");

const router = Router();

router.get("/", indexController.indexGet);

router
  .route("/signup")
  .get(indexController.indexSignupGet)
  .post(indexController.indexSignupPost);

router
  .route("/membership")
  .get(indexController.indexMembershipGet)
  .post(indexController.indexMembershipPost);

module.exports = router;

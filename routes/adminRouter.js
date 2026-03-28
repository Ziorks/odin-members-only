const { Router } = require("express");
const { messageDeletePost } = require("../controllers/adminController");
const { isAdmin } = require("../utilities/customMiddleware");

const router = Router();

router.use(isAdmin);

router.post("/message/:id/delete", messageDeletePost);

module.exports = router;

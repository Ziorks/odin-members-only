const db = require("../db/queries");

const messageDeletePost = async (req, res) => {
  await db.deleteMessage(req.params.id);
  res.redirect("/");
};

module.exports = { messageDeletePost };

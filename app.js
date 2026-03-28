require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("./utilities/expressSession");
const passport = require("./utilities/passportSession");
const { localizeUser, errorHandler } = require("./utilities/customMiddleware");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(passport);
app.use(localizeUser);

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", adminRouter);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

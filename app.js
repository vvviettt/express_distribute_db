var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var { connect } = require("./src/config/db-connect");
var indexRouter = require("./src/routes/index");
var authRouter = require("./src/user/routes/auth");
var userRouter = require("./src/user/routes/user");
var dashboardRouter = require("./src/dashboard/routes/index");
const session = require("express-session");
const { adminCheck } = require("./src/middlewares/admin.middleware");

var app = express();
connect();
// view engine setup
var handlebars = require("express-handlebars").create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: "layout",
  extname: "hbs",
  helpers: {
    inc: function (value, options) {
      return parseInt(value) + 1;
    },
    if_eq: function (a, b, opts) {
      if (a === b) return opts.fn(this);
      else return opts.inverse(this);
    },
    di: function (a, b, opts) {
      if (a % b == 0) return opts.fn(this);
      else return opts.inverse(this);
    },
  },
});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Session config
app.use(
  session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 3600000 } })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(adminCheck);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/dashboard", dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", function (req, res, next) {
  return authController.login(req, res, next);
});

router.post("/login", function (req, res, next) {
  return authController.loginPost(req, res, next);
});

module.exports = router;

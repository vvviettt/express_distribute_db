var express = require("express");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { checkRequest } = require("../dashboard/services/reques.service");
var router = express.Router();

router.put("/request/check", adminMiddleware, function (req, res, next) {
  checkRequest(req.body);
});

module.exports = router;

var express = require("express");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { checkRequest } = require("../dashboard/services/reques.service");
const { addClass } = require("../dashboard/services/class.service");
var router = express.Router();

router.put("/request/check", adminMiddleware, function (req, res, next) {
  checkRequest(req.body);
});

router.post("/class", adminMiddleware, async function (req, res, next) {
  try {
    await addClass(req.body);
    return res.redirect("/dashboard/classes");
  } catch (error) {
    return res.status(500).json("");
  }
});

module.exports = router;

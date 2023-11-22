var express = require("express");
const { adminMiddleware } = require("../../middlewares/admin.middleware");
const {
  changeActiveUser,
  editUserInfo,
  changePassword,
  addUser,
} = require("../controllers/user.controller");
var router = express.Router();

router.post("/", adminMiddleware, addUser);
router.put("/active", adminMiddleware, changeActiveUser);
router.post("/edit", adminMiddleware, editUserInfo);
router.post("/change-password", adminMiddleware, changePassword);

module.exports = router;

var express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const {
  dashboardControl,
  requestControl,
  listUser,
  addUser,
  addRequest,
  editUser,
} = require("../controllers");
const { adminMiddleware } = require("../../middlewares/admin.middleware");
var router = express.Router();

/* GET home page. */
router.get("/", authMiddleware, dashboardControl);
router.get("/user/edit", authMiddleware, editUser);
router.get("/request", authMiddleware, requestControl);
router.post("/request", authMiddleware, addRequest);
router.get("/list-user", adminMiddleware, listUser);
router.get("/add-user", adminMiddleware, addUser);

module.exports = router;

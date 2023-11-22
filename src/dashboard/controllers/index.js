const { getUserById, getUnits } = require("../../user/services/user.service");
const { getEvents } = require("../services/index.services");
const { addRequestService } = require("../services/reques.service");
const { getUsers } = require("../services/user.service");

async function dashboardControl(req, res, next) {
  try {
    const events = await getEvents(req.session.User.id);
    return res.render("normal-dashboard", {
      css: ["nomal-dashboard.css"],
      events: encodeURIComponent(JSON.stringify(events)),
      isAdmin: req?.session?.User?.roll === "admin",
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function requestControl(req, res, next) {
  try {
    return res.render("request", {
      css: ["nomal-dashboard.css", "request.css"],
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function addRequest(req, res, next) {
  try {
    await addRequestService(req.body.desc, req.session.User.id);
    return res.render("request", {
      css: ["nomal-dashboard.css", "request.css"],
      success: "Thêm thành công.",
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function listUser(req, res, next) {
  try {
    const users = await getUsers();
    console.log(users);
    return res.render("list-user", {
      css: ["nomal-dashboard.css", "list-user.css"],
      users: users,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function editUser(req, res) {
  const { id } = req.query;
  const user = await getUserById(id);
  delete user.password;
  const units = await getUnits();

  return res.render("user-edit", {
    css: ["nomal-dashboard.css", "edit-user.css"],
    units,
    user,
  });
}

async function addUser(req, res) {
  const units = await getUnits();
  return res.render("add-user", {
    css: ["nomal-dashboard.css", "add-user.css"],
    units,
  });
}

module.exports = {
  dashboardControl,
  requestControl,
  addRequest,
  listUser,
  editUser,
  addUser,
};

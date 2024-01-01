const { getUserById, getUnits } = require("../../user/services/user.service");
const {
  getClasses,
  activeClass,
  getAllDepartment,
} = require("../services/class.service");
const { getEvents } = require("../services/index.services");
const {
  addRequestService,
  getAllRequest,
} = require("../services/reques.service");
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

async function listRequest(req, res, next) {
  try {
    const requests = await getAllRequest();
    console.log(requests);
    return res.render("list-request", {
      css: ["nomal-dashboard.css", "list-user.css"],
      requests,
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

async function listSchedule(req, res) {
  const workSchedule = 1;
  return res;
}

async function listClasses(req, res) {
  const classes = await getClasses();
  return res.render("class-list", {
    css: ["nomal-dashboard.css", "list-user.css"],
    classes,
  });
}

async function activeClassRoute(req, res) {
  try {
    const { classId, isChecked } = req.body;
    if (!classId || !isChecked) {
      throw new Error("Errro");
    }
    await activeClass(isChecked, classId);
    return res.status(200).json("");
  } catch (error) {
    return res.status("500").json({ error: "SERVER ERROR" });
  }
}

async function addNewClass(req, res) {
  const departments = await getAllDepartment();

  return res.render("add-class", {
    css: ["nomal-dashboard.css", "add-user.css"],
    departments,
  });
}

module.exports = {
  dashboardControl,
  requestControl,
  addRequest,
  listUser,
  editUser,
  addUser,
  listRequest,
  listSchedule,
  listClasses,
  activeClassRoute,
  addNewClass,
};

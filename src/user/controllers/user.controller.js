const {
  changeActive,
  updateUserInformation,
  changePasswordService,
  addUserService,
} = require("../services/user.service");

async function changeActiveUser(req, res) {
  try {
    const { isChecked, userId } = req.body;
    await changeActive(userId, isChecked);
    return { status: 1 };
  } catch (error) {
    console.log(error);
    return { status: 0 };
  }
}

async function editUserInfo(req, res) {
  try {
    const { name, email, roll, unit, isActive, id } = req.body;
    await updateUserInformation(
      id,
      name,
      email,
      roll,
      unit,
      isActive === "on" ? 1 : 0
    );
    return res.redirect("/dashboard/list-user");
  } catch (error) {
    console.log(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const { id, password } = req.body;
    if (id && password) {
      await changePasswordService(id, password);
    }
    return res.redirect("/dashboard/list-user");
  } catch (error) {
    console.log(error);
  }
}

async function addUser(req, res, next) {
  try {
    const { name, email, password, roll, unit, isActive } = req.body;
    console.log("GUGU", req.body);
    if (!!name && !!email && !!password && !!roll && !!unit) {
      await addUserService(
        name,
        email,
        password,
        roll,
        unit,
        isActive === "on" ? 1 : 0
      );
      return res.redirect("/dashboard/list-user");
    }
    return res.redirect("/dashboard/add-user");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { changeActiveUser, editUserInfo, changePassword, addUser };

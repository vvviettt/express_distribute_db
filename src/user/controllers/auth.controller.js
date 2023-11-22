const { loginService } = require("../services/auth.service");

function login(req, res, next) {
  return res.render("login", { css: ["login.css"], layout: "layout" });
}

async function loginPost(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("login", {
      error: "Email or password invalid",
      css: ["login.css"],
      layout: "layout",
    });
  }
  try {
    const user = await loginService(username, password);
    console.log(user);
    if (user) {
      if (user.unitId != "UDN" && process.env.INIT_NAME == "UDN") {
        return res.render("login", {
          error: "Email or password invalid",
          css: ["login.css"],
          layout: "layout",
        });
      }
      req.session.User = user;
      return res.redirect("/dashboard");
    }
    throw Error("");
  } catch (error) {
    return res.render("login", {
      error: "Login fail",
      css: ["login.css"],
      layout: "layout",
    });
  }
}

module.exports = { login, loginPost };

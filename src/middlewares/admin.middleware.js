function adminMiddleware(req, res, next) {
  if (req.session.User?.roll === "admin") {
    res.params = { ...res.params, isAdmin: true };
    return next();
  }
  res.params = { ...res.params, isAdmin: false };
  return res.redirect("/auth/login");
  throw {
    message: "Không có quyền truy cập",
    status: 403,
  };
}

function adminCheck(req, res, next) {
  res.locals = { ...res.locals, isAdmin: req.session?.User?.roll === "admin" };
  return next();
}

module.exports = { adminMiddleware, adminCheck };

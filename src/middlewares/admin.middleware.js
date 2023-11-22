function adminMiddleware(req, res, next) {
  if (req.session.User?.roll === "admin") {
    console.log(req.session.User);
    res.params = { ...res.params, isAdmin: true };
    return next();
  }
  res.params = { ...res.params, isAdmin: false };
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

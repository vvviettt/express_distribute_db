function authMiddleware(req, res, next) {
  if (req.session.User) {
    return next();
  }
  req.session.Path = req.originalUrl;
  return res.redirect("/auth/login");
}

module.exports = { authMiddleware };

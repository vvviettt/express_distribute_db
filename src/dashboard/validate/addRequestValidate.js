function addRequestValidate(req, res, next) {
  const { desc } = req.body;
  if (!desc || desc.trim() === "") {
    return res.render("request", {
      css: ["nomal-dashboard.css", "request.css"],
      error: "Vui lòng điền đầy đủ thông tin",
    });
  }
  next();
}

module.exports = addRequestValidate;

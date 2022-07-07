exports.about = (req, res) => {
  let title = `About`;
  res.render("pages/about", { title: title });
};

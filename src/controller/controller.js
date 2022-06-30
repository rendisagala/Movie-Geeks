const movie = require("../models/movie");
const tv = require("../models/tv");

exports.testController = (req, res) => {
  const id = req.body.id;
  // const requested = req.body.requested;
  const page = req.body.page;
  tv.today(page, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
};

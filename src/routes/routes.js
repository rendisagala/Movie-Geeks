const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");
const detailsController = require("../controller/detailsController");

router.route("/").get(indexController.index);
router.route("/movie/details/:id").get(detailsController.movie);
router.route("/tv/details/:id").get(detailsController.tv);
router.route("/person/details/:id").get(detailsController.person);

module.exports = router;

const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");
const detailsController = require("../controller/detailsController");
const searchController = require("../controller/searchController");
const movieController = require("../controller/movieController");
const tvController = require("../controller/tvController");
const aboutController = require("../controller/aboutController");

router.route("/").get(indexController.index);
router.route("/movie/details/:id").get(detailsController.movie);
router.route("/tv/details/:id").get(detailsController.tv);
router.route("/person/details/:id").get(detailsController.person);
router.route("/search/:query/:page").get(searchController.result);
router.route("/movie/:page").get(movieController.movie);
router.route("/about").get(aboutController.about);
router.route("/tv/:page").get(tvController.tv);
router.route("/search").post(searchController.search);
// router.route("/page").post(searchController.page);

module.exports = router;

const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");

router.route("/").get(indexController.testController);

module.exports = router;

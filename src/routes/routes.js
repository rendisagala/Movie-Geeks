const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.route("/").get(controller.testController);

module.exports = router;

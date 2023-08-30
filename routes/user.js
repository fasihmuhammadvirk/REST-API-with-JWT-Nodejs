const users = require("../controller/user");
const express = require("express");
const emp = require("../controller/emp");
const bodyParser = require("body-parser");

var router = express();
router.use(bodyParser.json());

/// reg user
router.post("/register", users.reg_user);

/// reg user
router.get("/login", users.login_user);

module.exports = router;

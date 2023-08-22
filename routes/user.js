const user = require("../controller/user")
const express = require("express")
const bodyParser = require("body-parser")

var router = express()
router.use(bodyParser.json())

/// reg user
router.post("/register",user.reg_user)

/// reg user
router.post("/login",user.login_user)

module.exports = router;
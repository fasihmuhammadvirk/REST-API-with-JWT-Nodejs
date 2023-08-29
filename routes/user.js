const users = require("../controller/user")
const express = require("express")
const bodyParser = require("body-parser")

var router = express()
router.use(bodyParser.json())

/// reg user
router.post("/register",users.reg_user)

/// reg user
router.post("/login",users.login_user)

router.post("/getimage",users.get_image)

module.exports = router;
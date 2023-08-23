const emp = require("../controller/emp")
const auth = require("../middleware/auth")
const express = require("express")
const bodyParser = require("body-parser")

var router = express()
router.use(bodyParser.json())

router.get("/",auth.verifyToken_User,emp.greet)

router.post("/create",auth.verifyToken_User,emp.create)

router.get("/get",auth.verifyToken_User,emp.getEmp)

router.patch("/update",auth.verifyToken_User,emp.update)

router.delete("/delete",auth.verifyToken_User,emp.remove)

router.get("/emp/login",emp.login)

router.get("/emp/greet",auth.verifyToken_Emp,emp.greet)

module.exports = router;
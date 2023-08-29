const employee = require("../controller/emp")
const auth = require("../middleware/auth")
const express = require("express")
const bodyParser = require("body-parser")

var router = express()
router.use(bodyParser.json())

router.get("/",auth.verifyToken_User,employee.greet)

router.post("/create",auth.verifyToken_User,employee.create)

router.get("/get",auth.verifyToken_User,employee.getEmp)

router.patch("/update",auth.verifyToken_User,employee.update)

router.delete("/delete",auth.verifyToken_User,employee.remove)

router.get("/login",employee.login)

router.get("/greet",auth.verifyToken_Emp,employee.greet)

module.exports = router;
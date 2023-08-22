const emp = require("../controller/emp")
const express = require("express")
const bodyParser = require("body-parser")
const auth = require("../middleware/auth")

var router = express()
router.use(bodyParser.json())

router.get("/",auth,emp.greet)

router.post("/create",auth,emp.create)

router.get("/getall",auth,emp.getall)

router.get("/getone/:Email",auth,emp.getOne)

router.patch("/update/:Email",auth,emp.update)

router.delete("/delete/:Email",auth,emp.remove)


module.exports = router;
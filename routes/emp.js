const employee = require("../controller/emp");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");

// const multer = require("multer");

var router = express();
router.use(bodyParser.json());
router.use(
	fileUpload({
		useTempFiles: true,
	})
);
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

/// Greeting Employee
router.get("/", auth.verifyToken_User, employee.greet);

/// For Creating the Employee
router.post("/create", auth.verifyToken_User, employee.create);

/// For Getting Employees
router.get("/get", auth.verifyToken_User, employee.getEmp);

/// For Updating Employee
router.patch("/update", auth.verifyToken_User, employee.update);

/// For Deleting Employee
router.delete("/delete", auth.verifyToken_User, employee.remove);

/// For Login the Employee
router.get("/login", employee.login);


module.exports = router;

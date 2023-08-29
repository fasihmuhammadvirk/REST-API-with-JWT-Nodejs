const Employee = require("../models/emp");
const auth = require("../middleware/auth")

function greet(req, res) {
	try {
		return res.send(`Welcome to Unity Employee App`);
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
}
module.exports.greet = greet;

async function login(req, res) {
	try {
		const Email = req.body.Email;
		const Password = req.body.Password;

		if (!Email || !Password) {
			return res.send("Please fill all Fields");
		}

		_employee = await Employee.findOne({ Email });
		if (!_employee) {
			return res.send("You are Not an Employee Here");
		}

		const isMatch = await _employee.comparePassword(Password);

		if (!isMatch) {
			return res.send("Incorrect Password");
		}

		const token = auth.generate_token(_employee._id, _employee.Email);
		return res.send(`Login Successfully\n Your Token: ${token}`);
	} catch {
		return res.status(500).json("Internal server error");
	}
}
module.exports.login = login;

/// For Creating New Employee
async function create(req, res) {
	try {
		let Email = req.body.Email;
		let Phone = req.body.Phone;
		let FirstName = req.body.FirstName;
		let LastName = req.body.LastName;
		let Password = req.body.Password;

		if (!Email || !Phone || !Password) {
			return res.send("Please fill all the fields");
		}

		const isUser = await Employee.findOne({Email})
		if (isUser){
			return res.send("User Already Exists")
		}

		let _employee = new Employee({
			Email,
			Phone,
			FirstName,
			LastName,
			Password,
		});

		_employee.save().then((data) => {
				return res.send(`User Created\n${data}`);
			})
			.catch((err) => {
				return res.status(500).json({ message: "Error Creating User" });
			});
	} catch (err) {
		return res.status(500).json(`Internal server error: ${err}`);
	}
}
module.exports.create = create;

/// For Getting All Employee
async function getEmp(req, res) {
	try {
		let Email = req.query.Email;

		if (!Email) {
			await Employee.find({})
				.then((data) => {
					return res.send(data);
				})
				.catch((err) => {
					return res.status(500).json("Error Getting Employee");
				});
		} else {
			await Employee.findOne({ Email })
				.then((data) => {
					return res.send(data);
				})
				.catch((err) => {
					return res.status(500).json({ message: "Error Getting User" });
				});
		}
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
}
module.exports.getEmp = getEmp;

/// For Update Employee Data
async function update(req, res) {
	try {
		const Email = req.query.Email;
		if (!Email) {
			return res.send("Please Provide Parameter");
		}
		const updateData = req.body;
		if (!update) {
			return res.send("No Data Provided to be Updated");
		}

		_employee = await Employee.findOne({ Email });
		Employee.findByIdAndUpdate(_employee.id, updateData, { new: true })
			.then((updatedEmp) => {
				if (!updatedEmp) {
					return res.status(404).json({ message: "Employee not found" });
				}
				res.json(updatedEmp);
			})
			.catch((error) => {
				return res.status(500).json({ message: "Error updating employee" });
			});
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
}
module.exports.update = update;

/// For Deleting Employee
async function remove(req, res) {
	try {
		const Email = req.query.Email;
		if (!Email) {
			return res.send("Please Provide Parameter");
		}
		_employee = await Employee.findOne({ Email });
		Employee.findByIdAndDelete(_employee.id)
			.then((deletedEmployee) => {
				if (!deletedEmployee) {
					return res.status(404).json({ message: "Employee not found" });
				}
				return res.json({ message: "Employee deleted successfully" });
			})
			.catch((error) => {
				return res.status(500).json({ message: "Error deleting employee" });
			});
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
}
module.exports.remove = remove;

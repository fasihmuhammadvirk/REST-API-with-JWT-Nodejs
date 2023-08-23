const Emp = require("../models/emp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
require('dotenv').config()

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

		_employee = await Emp.findOne({ Email })
		if(!_employee){
			return res.send("You are Not an Employee Here");
		}
		if(_employee.Email == Email ||bcrypt.compare(Password, _employee.Password)){
			let token = jwt.sign(
				{ email: Email, password: Password },
				process.env.TOKEN_KEY,
				{
					expiresIn: "1hr",
				}
				);
			return res.send(`Login Successful\nYour Token: ${token}`)
		}
		else{
			return res.send("Invalid Email or Password")
		}
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
		if (!Email || !Phone || !FirstName || !LastName || !Password) {
			return res.send("Please fill all the fields");
		}

		let hash = await bcrypt.hash(Password, 10);
		let emp = new Emp({
			Email,
			Phone,
			FirstName,
			LastName,
			Password: hash,
		});
		emp
			.save()
			.then((data) => {
				return res.send(`User Created\n${data}`);
			})
			.catch((err) => {
				return res.status(500).json({ message: "Error Creating Employee" });
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
			await Emp.find({})
				.then((data) => {
					return res.send(data);
				})
				.catch((err) => {
					return res.status(500).json("Error Getting Employee");
				});
		} else {
			await Emp.findOne({ Email })
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
		hash = await bcrypt.hash(updateData.Password, 10);
		updateData.Password = hash;
		_user = await Emp.findOne({ Email });
		Emp.findByIdAndUpdate(_user.id, updateData, { new: true })
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
		_user = await Emp.findOne({ Email });
		Emp.findByIdAndDelete(_user.id)
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

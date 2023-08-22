const Emp = require("../models/emp");
const mongoose = require("mongoose");

function greet(req, res) {
	res.send("Welcome to Unity Employee App");
}
module.exports.greet = greet;

/// For Create API
function create(req, res) {
	let Email = req.body.Email;
	let Phone = req.body.Phone;
	let FirstName = req.body.FirstName;
	let LastName = req.body.LastName;
	let Password = req.body.Password;
	let emp = new Emp({
		Email,
		Phone,
		FirstName,
		LastName,
		Password,
	});
	emp.save().then((data) => {
		res.send(`User Created\n${data}`);
	});
}
module.exports.create = create;

/// For Read API
function getall(req, res) {
	Emp.find({}).then((data) => {
		res.send(data);
	});
}
module.exports.getall = getall;

/// For Read API
function getOne(req, res) {
	const Email = req.params.Email;
	Emp.findOne({ Email }).then((data) => {
		res.send(data);
	});
}
module.exports.getOne = getOne;

/// For Update

async function update(req, res) {
	const Email = req.params.Email; // Assuming the ID is part of the URL parameters
	const updateData = req.body;

	_user = await Emp.findOne({ Email });
	Emp.findByIdAndUpdate(_user.id, updateData, { new: true })
		.then((updatedEmp) => {
			if (!updatedEmp) {
				return res.status(404).json({ message: "Employee not found" });
			}
			res.json(updatedEmp);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "Error updating employee" });
		});
}
module.exports.update = update;

/// For Delete

async function remove(req, res) {
	const Email = req.params.Email; // Assuming the ID is part of the URL parameters
	_user = await Emp.findOne({ Email });
	Emp.findByIdAndDelete(_user.id)
		.then((deletedEmployee) => {
			if (!deletedEmployee) {
				return res.status(404).json({ message: "Employee not found" });
			}
			res.json({ message: "Employee deleted successfully" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "Error deleting employee" });
		});
}
module.exports.remove = remove;

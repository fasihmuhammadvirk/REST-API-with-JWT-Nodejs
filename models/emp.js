const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	Phone: {
		type: String,
		required: true,
		unique: true,
	},
	FirstName: {
		type: String,
		required: false,
	},
	LastName: {
		type: String,
		required: false,
	},

	Password: {
		type: String,
		required: true,
	},
	Image: {
		data: Buffer,
		contentType: String,
	},
});

employeeSchema.pre("save", async function (next) {
	const employee = this;
	if (!employee.isModified("Password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(employee.Password, salt);
		employee.Password = hashedPassword;
		next();
	} catch (err) {
		return next(err);
	}
});

employeeSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		return await bcrypt.compare(candidatePassword, this.Password);
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("Employee", employeeSchema);

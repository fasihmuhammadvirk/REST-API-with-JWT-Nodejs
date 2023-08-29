const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const usersSchema = new mongoose.Schema({
	Email: {
		type: String,
		required: true,
	},
	Password: {
		type: String,
		required: true,
	},
});
usersSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("Password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user.Password, salt);
		user.Password = hashedPassword;
		next();
	} catch (err) {
		return next(err);
	}
});

usersSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		return await bcrypt.compare(candidatePassword, this.Password);
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("Users", usersSchema);

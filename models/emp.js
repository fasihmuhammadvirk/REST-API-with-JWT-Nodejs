const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
	Email: {
		type: String,
  		required: true,
	},
	Phone: {
		type: String,
		required: true,
	},
	FirstName: {
		type: String,
		required: true,
	},
	LastName: {
		type: String,
		required: true,
	},
    
	Password: {
		type: String,
		required: true,
	},

});
module.exports = mongoose.model("Emp", empSchema);

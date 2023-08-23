const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
	Email: {
		type: String,
  		required: true,
		unique:true 
	},
	Phone: {
		type: String,
		required: true,
		unique:true
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

});
module.exports = mongoose.model("Emp", empSchema);

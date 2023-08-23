const express = require("express");
var app = express();

//Route
app.get("/", (req, res) => {
	res.send("Home Page");
});

//MongoDB connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/unity", { useNewUrlParser: true });
mongoose.connection
	.once("open", () => {
		console.log("Database connected Successfully");
	})
	.on("error", (err) => {
		console.log("Error", err);
	});

//Servers
app.listen(8000, () => {
	console.log("Server is Up at: http://127.0.0.1:8000");
});

//router
const user_router = require("./routes/user");
app.use("/unity/", user_router);

const emp_router = require("./routes/emp");
app.use("/unity", emp_router);


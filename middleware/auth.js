const jwt = require("jsonwebtoken");
const Employee = require("../models/emp");
const User = require("../models/user");
require("dotenv").config();

const generate_token = (ID, Email) => {
	const token = jwt.sign({ Id: ID, Email: Email }, process.env.TOKEN_KEY, {
		expiresIn: "1hr",
	});

	return token;
};

async function verifyToken_User(req, res, next) {
	const token = req.headers["user-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		decoded = jwt.decode(token);
		const Id = decoded.Id;
		
		const _user = await User.findById(Id);
		if (!_user) {
			return res.send("Invalid Token for a User");
		}
		if (_user) {
			jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
				if (err) {
					return res.send(err);
				}
				return next();
			});
		} else {
			return res.send("Invalid Token for a User");
		}
	} catch (err) {
		return res.status(400).send("Bad Request");
	}
}

async function verifyToken_Emp(req, res, next) {
	const token = req.headers["emp-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		decoded = jwt.decode(token);
		const Id = decoded.Id;
		const _employee = await Employee.findById(Id);
		if (!_employee) {
			return res.send("Invalid Token for a User");
		}
		if (_employee) {
			jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
				if (err) {
					return res.send(err);
				} else {
					return next();
				}
			});
		} else {
			return res.send("Invalid Token for a User");
		}
	} catch (err) {
		return res.status(400).send("Bad Request");
	}
}

module.exports = { verifyToken_Emp, verifyToken_User, generate_token };

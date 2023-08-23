const jwt = require("jsonwebtoken");
const Emp = require("../models/emp");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function verifyToken_User(req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["user-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		decoded = jwt.decode(token);
		const Email = decoded.email;
		const Password = decoded.password;
		_user = await User.findOne({ Email });
		if (!_user) {
			return res.send("Invalid Token for a User");
		}
		if (_user.Email == Email || bcrypt.compare(Password, _user.Password)) {
			jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
				if (err) {
					return res.send(err);
				}
        else{
          return next()
        }
			});
		} 
    else {
			return res.send("Invalid Token for a User");
		}
	} catch (err) {
		return res.status(400).send("Bad Request");
	}
}

module.exports.verifyToken_User = verifyToken_User;

async function verifyToken_Emp(req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["emp-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		decoded = jwt.decode(token);
		const Email = decoded.email;
		const Password = decoded.password;
		_Emp = await Emp.findOne({ Email });
		if (!_Emp) {
			return res.send("Invalid Token for a User");
		}
		if (_Emp.Email == Email || bcrypt.compare(Password, _Emp.Password)) {
			jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
				if (err) {
					return res.send(err);
				}
        else{
          return next()
        }
			});
		} 
    else {
			return res.send("Invalid Token for a User");
		}
	} catch (err) {
		return res.status(400).send("Bad Request");
	}
}


module.exports.verifyToken_Emp = verifyToken_Emp;

const User = require("../models/user");
const auth = require("../middleware/auth");

/// For Registering User
async function reg_user(req, res, next) {
	try {
		let Email = req.body.Email;
		let Password = req.body.Password;

		if (!(Email || Password)) {
			res.status(400).send("All Input Field Required");
		}
		const _userExist = await User.findOne({ Email });
		if (_userExist) {
			return res.send("User Already Exist, Please Login");
		}

		const _user = new User({
			Email,
			Password,
		});

		_user.save().then((data) => {
			res.send(data);
		});
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
}

/// For Login User
async function login_user(req, res) {
	try {
		const Email = req.body.Email;
		const Password = req.body.Password;

		if (!(Email || Password)) {
			res.status(400).send("All Input Field Required");
		}

		const _user = await User.findOne({ Email });

		if (!_user) {
			return res.send("User Not Found");
		}

		const isMatch = await _user.comparePassword(Password);

		if (!isMatch) {
			return res.send("Incorrect Password");
		}

		const token = auth.generate_token(_user._id, _user.Email);
		return res.send(`Login Successfully\n Your Token: ${token}`);
	} catch {
		return res.status(500).json("Internal server error");
	}
}

module.exports = { reg_user, login_user };

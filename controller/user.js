const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const process = require("dotenv").config();
const mongoose = require("mongoose");

TOKEN_KEY = "FasihMuhammadVirk";  

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
        
        bcrypt.hash(Password, 10, (err, hash) => {
            let user = new User({
                Email,
                Password:hash,
            });    
            user.save().then((data) => {
                res.send(data);
            });
        });
        
    }
    catch(err){
        return res.status(500).json("Internal server error");
    }

        

}
module.exports.reg_user = reg_user;

async function login_user(req, res) {
    
    try{

        const Email = req.body.Email;
        const Password = req.body.Password;
        
        User.findOne({ Email })
            .then((data) => {
                if (Email == data.Email || bcrypt.compare(Password, data.Password)) {
                    let token = jwt.sign(
                        { email: Email, password: Password },
                        TOKEN_KEY,
                        {
                            expiresIn: "1hr",
                        }
                        );
                        
                    res.send(`
                    Login Successfully\n
                    Your Token: ${token}
                    `)
                }
            })
            .catch((error) => {
                res.status(401).json({ message: "User Not Found Please Register" });
            });
        
    }
    catch{
        return res.status(500).json("Internal server error");
    }

}
module.exports.login_user = login_user;


const jwt = require("jsonwebtoken");
TOKEN_KEY = "FasihMuhammadVirk"
// const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, TOKEN_KEY, function(err,decoded){
    if (err){
      return res.send(err)
    }
    else{
      return next();
    }
    });
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
  
};

module.exports = verifyToken;
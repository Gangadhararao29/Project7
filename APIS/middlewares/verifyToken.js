const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  //extract token from headers of req.object
  tokenWithBearer = req.headers["authorisation"];

  if (tokenWithBearer) {
    token = tokenWithBearer.slice(7, tokenWithBearer.length);
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.send({ message: 'Session Expired' })
      } else {
        if (req.body.userName && req.body.userName !== decodedToken.userName) {
          res.send({ message: 'Unauthorised access' })
        }
        next();
      }
    })
  } else {
    res.send({ message: "Unauthorised access" })
  }
};

module.exports = validateToken;

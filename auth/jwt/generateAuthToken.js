const jwt = require("jsonwebtoken");
const config = require("config");
const key = config.get("JWT_KEY");

const generateAuthTokenJWT = (user) => {
  const { _id, isAdmin, isExpert } = user;
  const token = jwt.sign({ _id, isAdmin, isExpert }, key);
  return token;
};

module.exports = generateAuthTokenJWT;

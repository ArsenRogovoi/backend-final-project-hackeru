const jwt = require("jsonwebtoken");
const config = require("config");
const key = config.get("JWT_KEY");

const verifyTokenJWT = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};
module.exports = verifyTokenJWT;

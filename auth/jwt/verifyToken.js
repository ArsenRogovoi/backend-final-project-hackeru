const jwt = require("jsonwebtoken");
const config = require("config");
const key = config.get("JWT_KEY");

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};
module.exports = verifyToken;

const config = require("config");
const { verifyToken } = require("./jwt/verifyToken");
const { handleClientError } = require("../utils/errorHandlers");
const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.status(401).send("Access denied. Please Login.");

      const userInfo = verifyToken(token);
      if (!userInfo)
        return res.status(401).send("Access denied. Unauthorized user.");

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleClientError(res, 401, error.message);
    }
  }
};

module.exports = auth;

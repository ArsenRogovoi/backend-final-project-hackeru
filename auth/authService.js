const config = require("config");
const {
  handleClientError,
  handleServerError,
} = require("../utils/errorHandlers");
const verifyTokenJWT = require("./jwt/verifyToken");
const generateAuthTokenJWT = require("./jwt/generateAuthToken");
const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.status(401).send("Access denied. Please Login.");

      const userInfo = verifyTokenJWT(token);
      if (!userInfo)
        return res.status(401).send("Access denied. Unauthorized user.");

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleClientError(res, 401, error.message);
    }
  } else {
    handleServerError(
      "Currently only the JWT is supported. Please check your TOKEN_GENERATOR property in config files."
    );
  }
};

const generateAuthToken = (user) => {
  if (tokenGenerator === "jwt") {
    try {
      const token = generateAuthTokenJWT(user);
      return token;
    } catch (error) {
      handleClientError(res, 500, "Failed to generate auth token");
      handleServerError(error);
    }
  } else {
    handleServerError(
      "Currently only the JWT is supported. Please check your TOKEN_GENERATOR property in config files."
    );
  }
};

const verifyAuthToken = (token) => {
  if (tokenGenerator === "jwt") {
    return verifyTokenJWT(token);
  } else {
    handleServerError(
      "Currently only the JWT is supported. Please check your TOKEN_GENERATOR property in config files."
    );
  }
};

module.exports = { auth, generateAuthToken, verifyAuthToken };

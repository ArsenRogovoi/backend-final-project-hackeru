const config = require("config");
const loginValidation = require("./joi/loginValidation");
// const registerValidation = require("./joi/registerValidation");

const validator = config.get("VALIDATION") || "joi";

const validateRegistration = (user) => {
  if (validator === "joi") {
    // return registerValidation(user);
  }
};

const validateLogin = (user) => {
  if (validator === "joi") {
    return loginValidation(user);
  }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;

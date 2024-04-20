const config = require("config");
const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");
const appointmentValidation = require("./joi/appointmentValidation");

const validator = config.get("VALIDATION") || "joi";

const validateRegistration = (user) => {
  if (validator === "joi") {
    return registerValidation(user);
  }
};

const validateLogin = (user) => {
  if (validator === "joi") {
    return loginValidation(user);
  }
};

const validateAppointment = (appointment) => {
  if (validator === "joi") {
    return appointmentValidation(appointment);
  }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateAppointment = validateAppointment;

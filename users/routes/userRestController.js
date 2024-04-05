const express = require("express");
const router = express.Router();
const {
  handleClientError,
  handleServerError,
} = require("../../utils/errorHandlers");
const auth = require("../../auth/authService");
const {
  validateLogin,
  validateRegistration,
} = require("../../validation/validationService");
const { loginUser, registerUser } = require("../../db/userAccessData");
const chalk = require("chalk");

// registrarion endpoint
router.post("/", async (req, res) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return handleClientError(res, 400, `Validation Error: ${error}`);
    const user = await registerUser(req.body);
    return res.send(user);
  } catch (error) {
    handleServerError(error);
    handleClientError(res, 500, "Failed to save user in DB");
  }
});

// login endpoint
router.post("/login", async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return handleClientError(res, 400, `Validation Error: ${error}`);
    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    handleServerError(error.message);
    handleClientError(res, 500, "Failed to log in");
  }
});

module.exports = router;

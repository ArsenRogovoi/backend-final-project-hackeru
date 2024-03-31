const express = require("express");
const router = express.Router();
const {
  handleClientError,
  handleServerError,
} = require("../../utils/errorHandlers");
const auth = require("../../auth/authService");
const { validateLogin } = require("../../validation/validationService");
const loginUser = require("../../db/userAccessData");

// login endpoint
router.post("/", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return handleClientError(
        res,
        400,
        `Joi Error: ${error.details[0].message}`
      );
    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    handleServerError(error.message);
    handleClientError(res);
  }
});

// login endpoint
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return handleClientError(
        res,
        400,
        `Joi Error: ${error.details[0].message}`
      );
    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    handleServerError(error.message);
    handleClientError(res);
  }
});

module.exports = router;

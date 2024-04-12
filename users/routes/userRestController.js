const express = require("express");
const router = express.Router();
const {
  handleClientError,
  handleServerError,
} = require("../../utils/errorHandlers");
const { auth } = require("../../auth/authService");
const {
  validateLogin,
  validateRegistration,
} = require("../../validation/validationService");
const {
  loginUser,
  registerUser,
  getUser,
  getUsers,
  getExperts,
  getExpert,
} = require("../../db/userAccessData");

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
    handleServerError(error);
    handleClientError(res, 500, error.message);
  }
});

//get user endpoint
router.get("/userInfo/:id", auth, async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== requestedUserId && !isAdmin)
      handleClientError(
        res,
        403,
        "The client does not have access rights to the content"
      );
    const requestedUser = await getUser(requestedUserId);
    return res.send(requestedUser);
  } catch (error) {
    handleClientError(res, 500, "didn't success to get user from DB");
    handleServerError(error);
  }
});

//get users enpoint
router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin)
      handleClientError(
        res,
        403,
        "The client does not have access rights to the content"
      );
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    handleClientError(res, 500, "didn't success to get users from DB");
    handleServerError(error);
  }
});

//get experts for all users
router.get("/experts", async (req, res) => {
  try {
    const experts = await getExperts();
    return res.send(experts);
  } catch (error) {
    handleClientError(res, 500, "didn't success to get experts from DB");
    handleServerError(error);
  }
});

//get expert for all users
router.get("/experts/:id", async (req, res) => {
  try {
    const expertId = req.params.id;
    const expert = await getExpert(expertId);
    return res.send(expert);
  } catch (error) {
    handleClientError(res, 500, "didn't success to get expert from DB");
    handleServerError(error);
  }
});

//edit user

//delete user

module.exports = router;

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
router.get("/:id", auth, async (req, res) => {
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
    return users;
  } catch (error) {
    handleClientError(res, 500, "didn't success to get users from DB");
    handleServerError(error);
  }
});

//edit user

//delete user

module.exports = router;

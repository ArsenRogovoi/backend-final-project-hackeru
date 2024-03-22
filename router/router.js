const express = require("express");
const router = express.Router();
const userRestController = require("../users/routes/userRestController");
const { handleError } = require("../utils/errorHandler");

router.use("/users", userRestController);

router.use((req, res) => handleError(res, 404, "Page not found"));

module.exports = router;

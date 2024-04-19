const express = require("express");
const router = express.Router();
const userRestController = require("../users/routes/userRestController");
const appointmentRestController = require("../appointments/routes/appointmentRestController");
const { handleClientError } = require("../utils/errorHandlers");

router.use("/users", userRestController);
router.use("/appointments", appointmentRestController);
router.use((req, res) => handleClientError(res, 404, "Page not found"));

module.exports = router;

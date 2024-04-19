const express = require("express");
const router = express.Router();
const {
  handleClientError,
  handleServerError,
} = require("../../utils/errorHandlers");
const { auth } = require("../../auth/authService");
const { createAppointment } = require("../../db/appointmentAccessData");

router.post("/", auth, async (req, res) => {
  try {
    const { isExpert, isAdmin } = req.user;
    if (!isExpert && !isAdmin)
      return handleClientError(
        res,
        403,
        "You have to be an Expert to create appointment"
      );
    const appointment = req.body;
    // validation for appointment?
    const savedApp = await createAppointment(appointment);
    return res.send(savedApp);
  } catch (error) {
    handleClientError(res, 500, "didn't success to save appointment in DB");
    handleServerError(error);
  }
});

module.exports = router;

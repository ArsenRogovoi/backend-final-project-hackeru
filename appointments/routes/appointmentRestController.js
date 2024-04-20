const express = require("express");
const router = express.Router();
const {
  handleClientError,
  handleServerError,
} = require("../../utils/errorHandlers");
const { auth } = require("../../auth/authService");
const {
  createAppointment,
  getAppointmentsOfMonth,
} = require("../../db/appointmentAccessData");
const { validateAppointment } = require("../../validation/validationService");

router.post("/", auth, async (req, res) => {
  try {
    const { isExpert, _id } = req.user;
    if (!isExpert)
      return handleClientError(
        res,
        403,
        "You have to be an Expert to create appointment"
      );
    const appointment = req.body;
    appointment.expertId = _id;
    const error = validateAppointment(appointment);
    if (error) return handleClientError(res, 400, `Validation Error: ${error}`);
    const savedApp = await createAppointment(appointment);
    return res.send(savedApp);
  } catch (error) {
    handleClientError(res, 500, "didn't success to save appointment in DB");
    handleServerError(error);
  }
});

router.get("/schedule/:id/month/:month/year/:year", auth, async (req, res) => {
  try {
    const { _id, isExpert } = req.user;
    const { id, year, month } = req.params;
    if (!isExpert && _id !== id)
      return handleClientError(res, 403, "Access denied");
    const appointments = await getAppointmentsOfMonth(_id, year, month);
    return res.send(appointments);
  } catch (error) {
    handleClientError(res, 500, error);
    handleServerError(error);
  }
});

module.exports = router;

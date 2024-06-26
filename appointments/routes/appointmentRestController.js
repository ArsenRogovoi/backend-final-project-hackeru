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
  getAppointmentById,
  deleteAppointmentById,
  getExpertFreeApptsByDateRange,
  hasApptsAtThisTime,
  hasApptsWithSameExp,
  bookAppointment,
  getMyBookedAppts,
  userCancelAppt,
} = require("../../db/appointmentAccessData");
const { validateAppointment } = require("../../validation/validationService");
const dayjs = require("dayjs");
const {
  getUserMongo,
} = require("../../db/dataBases/mongoDB/services/userService");
const { getUser } = require("../../db/userAccessData");
const chalk = require("chalk");

// for experts
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
    const expertFromDB = await getUser(_id);
    appointment.expertId = _id;
    appointment.expertName = `${expertFromDB.username.firstName} ${expertFromDB.username.lastName}`;
    const error = validateAppointment(appointment);
    if (error) return handleClientError(res, 400, `Validation Error: ${error}`);
    const savedApp = await createAppointment(appointment);
    return res.send(savedApp);
  } catch (error) {
    if (error.message === "There is another appointment in this time") {
      return handleClientError(
        res,
        409,
        "You already have appointment at this time"
      );
    } else {
      handleClientError(res, 500, "Failed to save appointment in DB");
    }
    handleServerError(error);
  }
});

// for experts
router.delete("/:appointmentId", auth, async (req, res) => {
  try {
    const { _id, isExpert } = req.user;
    const appId = req.params.appointmentId;
    if (!isExpert)
      handleClientError(
        res,
        403,
        "You have to be an Expert to delete appointment"
      );
    const appFromDB = await getAppointmentById(appId);
    if (!appFromDB)
      handleClientError(
        res,
        404,
        `Appointment with id ${appId} not found in DB`
      );
    if (_id !== appFromDB.expertId.toString())
      return handleClientError(res, 403, "Forbidden");

    const deletedAppointment = await deleteAppointmentById(appId);
    return res.send(deletedAppointment);
  } catch (error) {
    handleClientError(res, 500, "didn't success to delete appointment from DB");
    handleServerError(error);
  }
});

// get appts of certain month for expert
router.get("/schedule/:id/:month/:year", auth, async (req, res) => {
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

// get unreserved appts in certain date range for regular user
router.get("/free-appts/:id/:from/:to", async (req, res) => {
  try {
    const { id, from, to } = req.params;
    const fromDate = dayjs(from).startOf("day").toDate();
    const toDate = dayjs(to).endOf("day").toDate();
    const appts = await getExpertFreeApptsByDateRange(id, fromDate, toDate);
    return res.send(appts);
  } catch (error) {
    handleClientError(res, 500, error);
    handleServerError(error);
  }
});

router.get("/my-appts", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const bookedAppts = await getMyBookedAppts(_id);
    return res.send(bookedAppts);
  } catch (error) {
    handleClientError(res, 500, error);
    handleServerError(error);
  }
});

// book appointment (user)
router.put("/:apptId", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { apptId } = req.params;
    const appt = await getAppointmentById(apptId);
    const userFromDB = await getUserMongo(userId);
    if (!appt)
      return handleClientError(
        res,
        404,
        "This appointment has not found in DB"
      );
    const apptsInSameTime = await hasApptsAtThisTime(appt, userId);
    if (apptsInSameTime)
      return handleClientError(
        res,
        400,
        "You alredy has appointments in the same time"
      );
    const apptWithSameExp = await hasApptsWithSameExp(appt, userId);
    if (apptWithSameExp)
      return handleClientError(
        res,
        400,
        "You already has appointment with this expert"
      );
    const bookedAppt = await bookAppointment(appt, userFromDB);
    if (!bookedAppt)
      return handleClientError(res, 500, "Failed to book appointment");
    return res.send(bookedAppt);
  } catch (error) {
    handleClientError(res, 500, error);
    handleServerError(error);
  }
});

router.put("/cancel-appt/:apptId", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const apptId = req.params.apptId;
    const apptFromDB = await getAppointmentById(apptId);
    if (!apptFromDB)
      handleClientError(res, 400, "Appointment has not found in DB");
    if (apptFromDB.userId.toString() !== _id)
      handleClientError(res, 403, "This appointment has not your data");
    const canceledAppt = await userCancelAppt(apptId);
    return res.send(canceledAppt);
  } catch (error) {
    handleClientError(res, 500, error);
    handleServerError(error);
  }
});

module.exports = router;

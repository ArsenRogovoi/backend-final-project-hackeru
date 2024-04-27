const dayjs = require("dayjs");
const { Appointment } = require("../models/appointments/Appointment");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const createAppointmentMongo = async (appointment) => {
  try {
    const { expertId, startTime: st, endTime: et } = appointment;
    // searching appointments that overlap new appointment
    const overlapedApps = await Appointment.find({
      expertId: expertId,
      $or: [
        { startTime: { $gt: st, $lt: et } },
        { endTime: { $gt: st, $lt: et } },
        { startTime: { $lt: st }, endTime: { $gt: et } },
      ],
    });
    if (overlapedApps.length !== 0)
      throw new Error("There is another appointment in this time");
    let app = new Appointment(appointment);
    app = await app.save();
    return app;
  } catch (error) {
    throw error;
  }
};

const bookAppointmentMongo = async (appt, user) => {
  try {
    const now = dayjs().utc();
    const { _id: apptId } = appt;
    const {
      _id: userId,
      username: { firstName, lastName },
    } = user;
    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        _id: apptId,
        userId: null,
        startTime: { $gte: now.toDate() },
      },
      {
        userId: userId,
        userName: `${firstName} ${lastName}`,
        isBooked: true,
      },
      {
        new: true,
      }
    );

    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};

// returns only future appointments
const getAppointmentByIdMongo = async (apptId) => {
  try {
    const now = dayjs().utc();
    const appointment = await Appointment.findOne({
      _id: apptId,
      startTime: { $gte: now.toDate() },
    });
    return appointment;
  } catch (error) {
    throw error;
  }
};

const getExpertFreeApptsByDateRangeMongo = async (_id, from, to) => {
  try {
    const appointments = await Appointment.find({
      expertId: _id,
      isBooked: false,
      startTime: { $gte: from },
      endTime: { $lte: to },
    });
    return appointments;
  } catch (error) {
    throw error;
  }
};

const getAppointmentsOfMonthMongo = async (expertId, year, month) => {
  try {
    const startDate = dayjs().year(year).month(month).startOf("month").toDate();
    const endDate = dayjs().year(year).month(month).endOf("month").toDate();

    const appointments = await Appointment.find({
      expertId: expertId,
      startTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return appointments;
  } catch (error) {
    throw error;
  }
};

const deleteAppointmentMongo = async (appointmentId) => {
  try {
    const deletedApp = await Appointment.findByIdAndDelete(appointmentId);
    return deletedApp;
  } catch (error) {
    throw error;
  }
};

const hasApptsAtThisTimeMongo = async (appt, userId) => {
  try {
    const now = dayjs().utc();
    const overlapedAppts = await Appointment.find({
      userId: userId,
      $or: [
        {
          startTime: { $lt: appt.endTime, $gt: appt.startTime },
        },
        {
          endTime: { $gt: appt.startTime, $lt: appt.endTime },
        },
      ],
      startTime: { $gte: now.toDate() },
    });
    if (overlapedAppts.length === 0) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const hasApptsWithSameExpMongo = async (appt, userId) => {
  try {
    const now = dayjs().utc();
    const overlapedAppts = await Appointment.find({
      userId: userId,
      expertId: appt.expertId,
      startTime: { $gte: now.toDate() },
    });
    if (overlapedAppts.length === 0) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAppointmentMongo,
  getAppointmentsOfMonthMongo,
  deleteAppointmentMongo,
  getAppointmentByIdMongo,
  getExpertFreeApptsByDateRangeMongo,
  hasApptsAtThisTimeMongo,
  hasApptsWithSameExpMongo,
  bookAppointmentMongo,
};

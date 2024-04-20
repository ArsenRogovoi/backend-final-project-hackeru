const dayjs = require("dayjs");
const { Appointment } = require("../models/appointments/Appointment");

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

module.exports = { createAppointmentMongo, getAppointmentsOfMonthMongo };

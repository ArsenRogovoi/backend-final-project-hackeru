const config = require("config");
const {
  createAppointmentMongo,
  getAppointmentsOfMonthMongo,
  getAppointmentByIdMongo,
  deleteAppointmentMongo,
  getExpertFreeApptsByDateRangeMongo,
} = require("./dataBases/mongoDB/services/appointmentService");
const DB = config.get("DB");

const createAppointment = async (app) => {
  if (DB === "mongoDB") {
    const newApp = await createAppointmentMongo(app);
    return newApp;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getAppointmentsOfMonth = async (expertId, year, month) => {
  if (DB === "mongoDB") {
    const appointments = await getAppointmentsOfMonthMongo(
      expertId,
      year,
      month
    );
    return appointments;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getAppointmentById = async (_id) => {
  if (DB === "mongoDB") {
    const appointment = await getAppointmentByIdMongo(_id);
    return appointment;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const deleteAppointmentById = async (_id) => {
  if (DB === "mongoDB") {
    const appointment = await deleteAppointmentMongo(_id);
    return appointment;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getExpertFreeApptsByDateRange = async (_id, from, to) => {
  if (DB === "mongoDB") {
    const appointments = await getExpertFreeApptsByDateRangeMongo(
      _id,
      from,
      to
    );
    return appointments;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

module.exports = {
  createAppointment,
  getAppointmentsOfMonth,
  getAppointmentById,
  deleteAppointmentById,
  getExpertFreeApptsByDateRange,
};

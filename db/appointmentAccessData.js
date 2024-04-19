const config = require("config");
const {
  createAppointmentMongo,
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

module.exports = { createAppointment };

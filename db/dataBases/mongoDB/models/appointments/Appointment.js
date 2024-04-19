const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isBooked: { type: Boolean, default: false },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = { Appointment };

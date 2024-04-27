const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    expertName: { type: String, default: null },
    userName: { type: String, default: null },
    isBooked: { type: Boolean, default: false },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true, collection: "appointments" }
);

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = { Appointment };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      firstName: {
        type: String,
        minLength: 2,
        required: true,
      },
      lastName: {
        type: String,
        minLength: 2,
        required: true,
      },
    },
    email: {
      type: String,
      match: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      required: true,
    },
    password: {
      type: String,
      match: RegExp(
        /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[!@#$%^&*\-_]).{8,}$/
      ),
      required: true,
    },
    profilePicturePath: {
      type: String,
      default: "image place holder path!",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isExpert: {
      type: Boolean,
      default: false,
    },
    favExperts: { type: [String], default: [] },
    appointmentIds: { type: [String], default: [] },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("user", userSchema);

module.exports = { User, userSchema };

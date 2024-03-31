import mongoose from "mongoose";
const { Schema } = mongoose;
const { userSchema } = require("./User");

const expertSchema = new Schema({
  specialization: { type: String, required: true },
  bio: { type: String },
  rating: { type: Number },
  reviews: ["rev1", "rev2"],
  contactPhone: { type: String, required: true },
  address: {
    Country: { type: String, required: true },
    City: { type: String, required: true },
    Street: { type: String, required: true },
    houseNum: { type: Number, required: true },
  },
});

expertSchema.add(userSchema);
const Expert = mongoose.model("experts", expertSchema);
module.exports = Expert;

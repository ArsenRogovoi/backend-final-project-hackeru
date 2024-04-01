import mongoose from "mongoose";
const { Schema } = mongoose;
const { userSchema } = require("./User");

const expertSchema = new Schema({
  specialization: { type: String, required: true },
  bio: { type: String },
  rating: { type: Number },
  reviews: ["rev1", "rev2"],
  contactPhone: {
    type: String,
    match: RegExp(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/
    ),
    required: true,
  },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNum: { type: Number, required: true },
  },
});

expertSchema.add(userSchema);
const Expert = mongoose.model("experts", expertSchema);
module.exports = Expert;

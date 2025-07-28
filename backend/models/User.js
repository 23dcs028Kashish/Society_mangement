// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // based on house number or flat
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "resident"], required: true },
  flatNumber: { type: String, required: true }, // e.g., "A-101"
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("User", userSchema);
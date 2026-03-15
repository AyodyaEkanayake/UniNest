const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  facilities: [String],
}, { timestamps: true });

module.exports = mongoose.model("Hostel", hostelSchema);
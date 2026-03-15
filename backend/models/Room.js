const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true
  },

  roomNumber: {
    type: String,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  occupants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  status: {
    type: String,
    enum: ["Available", "Full", "Maintenance"],
    default: "Available"
  }
});

module.exports = mongoose.model("Room", roomSchema);
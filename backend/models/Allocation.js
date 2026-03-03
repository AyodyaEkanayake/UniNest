const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Allocation", allocationSchema);
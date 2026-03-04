const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Cancelled"], default: "Active" },
  logs: [
    {
      action: String,
      by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: Date,
    }
  ]
});

module.exports = mongoose.model("Allocation", allocationSchema);
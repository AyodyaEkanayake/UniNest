const Allocation = require("../models/Allocation");
const Room = require("../models/Room");


// 👩‍🎓 STUDENT — VIEW OWN ALLOCATION
exports.getMyAllocation = async (req, res) => {
  try {
    const allocation = await Allocation
      .findOne({ student: req.user.id })
      .populate({
        path: "room",
        populate: { path: "hostel" }
      });

    if (!allocation) {
      return res.json({ message: "No allocation yet" });
    }

    res.json(allocation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🛠️ ADMIN — VIEW ALL ALLOCATIONS
exports.getAllocations = async (req, res) => {
  try {
    const allocations = await Allocation
      .find()
      .populate("student")
      .populate({
        path: "room",
        populate: { path: "hostel" }
      });

    res.json(allocations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🛠️ ADMIN — CREATE ALLOCATION MANUALLY (optional)
exports.createAllocation = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }

    const allocation = new Allocation({
      student: studentId,
      room: roomId
    });

    room.occupants.push(studentId);

    if (room.occupants.length >= room.capacity) {
      room.status = "Full";
    }

    await room.save();
    await allocation.save();

    res.status(201).json({
      message: "Allocation created successfully",
      allocation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🛠️ ADMIN — CANCEL ALLOCATION
// 🛠️ ADMIN — Cancel Allocation (improved)
exports.cancelAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id);

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    // 🔹 Prevent double cancellation
    if (allocation.status === "Cancelled") {
      return res.status(400).json({ message: "Allocation already cancelled" });
    }

    const room = await Room.findById(allocation.room);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // 🔹 Remove student from room occupants
    room.occupants = room.occupants.filter(
      (studentId) => studentId.toString() !== allocation.student.toString()
    );

    // 🔹 Update room status
    room.status = room.occupants.length < room.capacity ? "Available" : "Full";

    await room.save();

    // 🔹 Soft delete: mark allocation as cancelled
    allocation.status = "Cancelled";
    await allocation.save();

    // 🔹 Add cancellation log
    allocation.logs = allocation.logs || [];
    allocation.logs.push({
      action: "Cancelled",
      by: req.user.id,
      date: new Date(),
    });
    await allocation.save();

    res.json({ message: "Allocation cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👩‍🎓 STUDENT — Request cancellation
exports.requestCancellation = async (req, res) => {
  try {
    const allocation = await Allocation.findOne({ student: req.user.id, status: "Active" });

    if (!allocation) {
      return res.status(404).json({ message: "No active allocation found" });
    }

    allocation.status = "PendingCancellation";
    allocation.logs = allocation.logs || [];
    allocation.logs.push({ action: "Requested cancellation", by: req.user.id, date: new Date() });

    await allocation.save();

    res.json({ message: "Cancellation request sent. Awaiting admin approval." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Room = require("../models/Room");


// CREATE ROOM (Admin)
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL ROOMS
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hostel");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// AUTO ALLOCATE ROOM TO STUDENT
exports.allocateRoom = async (req, res) => {
  try {
    const studentId = req.body.studentId;

    // Find room with space
    const room = await Room.findOne({
      status: "Available",
      $expr: { $lt: [{ $size: "$occupants" }, "$capacity"] }
    });

    if (!room) {
      return res.status(400).json({ message: "No rooms available" });
    }

    // Add student to room
    room.occupants.push(studentId);

    // Update status if full
    if (room.occupants.length >= room.capacity) {
      room.status = "Full";
    }

    await room.save();

    res.json({
      message: "Room allocated successfully",
      room
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
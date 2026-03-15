const Application = require("../models/Application");
const Room = require("../models/Room");
const Allocation = require("../models/Allocation");

// STUDENT APPLY
exports.applyHostel = async (req, res) => {
  try {

    const student = req.user.id;   // 🔥 get logged-in student
    const { hostel } = req.body;

    // 🛑 Check if student already has allocation
    const existingAllocation = await Allocation.findOne({ student });

    if (existingAllocation) {
      return res.status(400).json({
        message: "Student already allocated a room"
      });
    }

    // 🛑 Check if student already applied
    const existingApplication = await Application.findOne({
      student,
      status: { $in: ["Pending", "Approved"] }
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Student already applied for a hostel"
      });
    }

    const application = await Application.create({
      student,
      hostel
    });

    res.status(201).json({
      message: "Application submitted",
      application
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN — VIEW ALL APPLICATIONS
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application
      .find()
      .populate("student hostel");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ADMIN — APPROVE APPLICATION
exports.approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (!application.hostel) {
      return res.status(400).json({ 
        message: "Hostel not specified in application" 
      });
    }

    // 🛑 PREVENT DOUBLE ALLOCATION
    const existingAllocation = await Allocation.findOne({
      student: application.student
    });

    if (existingAllocation) {
      return res.status(400).json({
        message: "Student already allocated a room"
      });
    }

    // ✅ Find available room
    const room = await Room.findOne({
      hostel: application.hostel,
      $expr: { $lt: [{ $size: "$occupants" }, "$capacity"] }
    });

    if (!room) {
      return res.status(400).json({
        message: "No rooms available for this hostel"
      });
    }

    // 🛏️ Create allocation
    const allocation = new Allocation({
      student: application.student,
      room: room._id
    });

    await allocation.save();

    // ➕ Add student to occupants
    room.occupants.push(application.student);

    // 🔄 Update room status
    if (room.occupants.length >= room.capacity) {
      room.status = "Full";
    } else {
      room.status = "Available";
    }

    await room.save();

    // ✅ Update application
    application.status = "Approved";
    await application.save();

    res.json({
      message: "Application approved & room allocated successfully",
      allocation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN — REJECT APPLICATION
exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    application.status = "Rejected";
    await application.save();

    res.json({ message: "Application rejected", application });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
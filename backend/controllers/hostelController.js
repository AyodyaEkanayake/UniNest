const Hostel = require("../models/Hostel");


// CREATE HOSTEL (Admin)
exports.createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL HOSTELS
exports.getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE HOSTEL
exports.getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE HOSTEL
exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE HOSTEL
exports.deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hostel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
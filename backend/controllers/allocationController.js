const Allocation = require("../models/Allocation");

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
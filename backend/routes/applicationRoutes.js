const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const { verifyToken, isAdmin, isStudent } = require("../middleware/authMiddleware");

// 👩‍🎓 STUDENT — Apply
router.post("/", verifyToken, isStudent, applicationController.applyHostel);

// 🛠️ ADMIN — View applications
router.get("/", verifyToken, isAdmin, applicationController.getApplications);

// 🛠️ ADMIN — Approve
router.put("/approve/:id", verifyToken, isAdmin, applicationController.approveApplication);

// 🛠️ ADMIN — Reject
router.put("/reject/:id", verifyToken, isAdmin, applicationController.rejectApplication);

module.exports = router;
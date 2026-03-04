const express = require("express");
const router = express.Router();

const allocationController = require("../controllers/allocationController");
const { verifyToken, isAdmin, isStudent } = require("../middleware/authMiddleware");

// 👩‍🎓 STUDENT — View own allocation
router.get("/my", verifyToken, isStudent, allocationController.getMyAllocation);

// 👩‍🎓 STUDENT — Request cancellation
router.put("/request-cancel", verifyToken, isStudent, allocationController.requestCancellation);

// 🛠️ ADMIN — View all allocations
router.get("/", verifyToken, isAdmin, allocationController.getAllocations);

// 🛠️ ADMIN — Create allocation manually
router.post("/", verifyToken, isAdmin, allocationController.createAllocation);

// 🛠️ ADMIN — Cancel allocation (approve student request or direct cancel)
router.delete("/:id", verifyToken, isAdmin, allocationController.cancelAllocation);

// 🛠️ ADMIN — Approve student cancellation request
router.put("/approve-cancel/:id", verifyToken, isAdmin, allocationController.approveCancellation);

module.exports = router;
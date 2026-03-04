const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const allocationController = require("../controllers/allocationController");

// 🛠️ ADMIN — View all allocations
router.get("/", verifyToken, isAdmin, allocationController.getAllocations);

// 🛠️ ADMIN — Create allocation manually (optional)
router.post("/", verifyToken, isAdmin, allocationController.createAllocation);

// 🛠️ ADMIN — Cancel allocation
router.delete("/:id", verifyToken, isAdmin, allocationController.cancelAllocation);

module.exports = router;
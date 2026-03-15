const express = require("express");
const router = express.Router();

const allocationController = require("../controllers/allocationController");

const { verifyToken, isAdmin, isStudent } = require("../middleware/authMiddleware");


// 👩‍🎓 STUDENT — View own allocation
router.get("/my", verifyToken, isStudent, allocationController.getMyAllocation);


// 👩‍🎓 STUDENT — Request cancellation
router.put("/request-cancellation", verifyToken, isStudent, allocationController.requestCancellation);


// 🛠️ ADMIN — View all allocations
router.get("/", verifyToken, isAdmin, allocationController.getAllocations);


// 🛠️ ADMIN — Create allocation manually
router.post("/", verifyToken, isAdmin, allocationController.createAllocation);


// 🛠️ ADMIN — Approve cancellation request
router.put("/approve-cancellation/:id", verifyToken, isAdmin, allocationController.approveCancellation);


// 🛠️ ADMIN — Cancel allocation directly
router.delete("/:id", verifyToken, isAdmin, allocationController.cancelAllocation);



module.exports = router;
const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocationController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/my", verifyToken, allocationController.getMyAllocation);

module.exports = router;
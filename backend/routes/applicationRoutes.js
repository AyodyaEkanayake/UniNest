const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.post("/", applicationController.applyHostel);
router.get("/", applicationController.getApplications);
router.put("/approve/:id", applicationController.approveApplication);
router.put("/reject/:id", applicationController.rejectApplication);

module.exports = router;
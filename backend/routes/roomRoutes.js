const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/", roomController.createRoom);  // create room
router.get("/", roomController.getRooms);     // get all rooms

module.exports = router;
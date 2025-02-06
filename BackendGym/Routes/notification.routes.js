const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// This route is not necessary but added for clarity.
router.get("/send-notifications", notificationController.checkDueDatesAndNotify);

module.exports = router;

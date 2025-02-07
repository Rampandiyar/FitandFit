import express from "express"
import notificationController from "../Controller/notification.controller.js"

const router = express.Router();
// This route is not necessary but added for clarity.
router.get("/send-notifications", notificationController.checkDueDatesAndNotify);

module.exports = router;

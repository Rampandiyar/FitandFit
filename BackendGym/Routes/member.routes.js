const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const { authenticateUser } = require("../middleware/authenticate");

router.put("/:id", authenticateUser, memberController.updateMember);
router.delete("/:id", authenticateUser, memberController.deleteMember);

module.exports = router;

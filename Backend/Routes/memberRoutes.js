import express from "express";
import { getMembers, getMemberById, addMember, updateMember, deleteMember } from "../Controller/memberController.js";

const router = express.Router();

// Routes for members
router.get("/get", getMembers); // Get all members
router.get("/get/:id", getMemberById); // Get a single member by ID
router.post("/add", addMember); // Add a new member
router.put("/edit/:id", updateMember); // Update a member
router.delete("/delete/:id", deleteMember); // Delete a member

export default router;
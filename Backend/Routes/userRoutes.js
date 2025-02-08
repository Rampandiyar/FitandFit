import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controller/userController.js";
import { authenticate } from "../Model/authMiddleware.js";


const router = express.Router();

router.post("/register",authenticate, registerUser);
router.post("/login", loginUser);
router.get("/get",authenticate, getUsers);
router.get("/get/:id",authenticate, getUserById);
router.put("/edit/:id",authenticate, updateUser);
router.delete("/delete/:id",authenticate, deleteUser);

export default router;

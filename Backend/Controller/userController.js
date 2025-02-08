import { db } from "../index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, phone_no, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO user (name, email, password, phone_no, role) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, hashedPassword, phone_no, role || "admin"], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating user", error: err });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  });
};

// Get All Users
export const getUsers = (req, res) => {
  const sql = "SELECT user_id, name, email, phone_no, role, created_at FROM user";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users", error: err });
    res.status(200).json(results);
  });
};

// Get Single User
export const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT user_id, name, email, phone_no, role, created_at FROM user WHERE user_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user", error: err });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(results[0]);
  });
};

// Update User
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone_no, role } = req.body;

  const sql = "UPDATE user SET name = ?, email = ?, phone_no = ?, role = ? WHERE user_id = ?";
  db.query(sql, [name, email, phone_no, role, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating user", error: err });
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete User
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM user WHERE user_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting user", error: err });
    res.status(200).json({ message: "User deleted successfully" });
  });
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const SECRET_KEY = process.env.SECRET_KEY;

const register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error registering user.");
    }

    userModel.registerUser(username, email, hashedPassword, (error, results) => {
      if (error) {
        return res.status(500).send("Error inserting user into database.");
      }
      res.status(201).send({ message: "User registered successfully" });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  userModel.getUserByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).send("Error querying database.");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error checking password.");
      }

      if (isMatch) {
        const token = jwt.sign(
          { userId: user.id, username: user.username, email: user.email },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).send("Incorrect password.");
      }
    });
  });
};

module.exports = { register, login };

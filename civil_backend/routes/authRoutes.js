const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = "your_generated_jwt_secret"; // Use the same secret key as in login

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password, phone });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Protected Route
router.get("/protected-route", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
});

module.exports = router;

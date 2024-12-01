import express from "express";
import bcrypt from "bcryptjs"; // Changed to bcryptjs
import jwt from "jsonwebtoken";
import Trainee from "../models/Trainee.js";

const router = express.Router();

// Register Trainee
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({ message: "Trainee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // bcryptjs supports the same API
    const newTrainee = new Trainee({ name, email, password: hashedPassword });

    await newTrainee.save();
    res.status(201).json({ message: "Trainee registered successfully", trainee: newTrainee });
  } catch (error) {
    res.status(500).json({ message: "Error occurred during registration", error: error.message });
  }
});

// Login Trainee
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const trainee = await Trainee.findOne({ email });
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, trainee.password); // bcryptjs supports compare
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: trainee._id, email: trainee.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error occurred during login", error: error.message });
  }
});

export default router;

import express from "express";
import Booking from "../models/Booking.js"; // Booking Model
import { authenticate } from "../middleware/auth.js"; // JWT Authentication Middleware

const router = express.Router();

// Book a Class
router.post("/book-class", authenticate, async (req, res) => {
  const { classId, traineeId, date } = req.body;

  try {
    const newBooking = new Booking({ classId, traineeId, date });
    await newBooking.save();
    res.status(201).json({ message: "Class booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error occurred during booking", error: error.message });
  }
});

// Get All Bookings (Optional for Admin)
router.get("/all", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

export default router;

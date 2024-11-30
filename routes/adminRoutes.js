import express from "express";
import Trainer from "../models/Trainer.js";
import ClassSchedule from "../models/ClassSchedule.js";
import { authenticate } from "../middleware/auth.js";
import mongoose from "mongoose";


const router = express.Router();

router.post("/add-trainer", authenticate, async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-schedule", authenticate, async (req, res) => {
  try {
    const { date, time, trainer_id } = req.body;

    // Ensure the trainer_id is a valid ObjectId before saving
    const trainer = await Trainer.findById(trainer_id);
    if (!trainer) {
      return res.status(400).json({ message: "Trainer not found" });
    }

    const schedule = new ClassSchedule({
      date,
      time,
      trainer_id
    });

    const savedSchedule = await schedule.save();
    // Populate the trainer data for the schedule
    const populatedSchedule = await savedSchedule.populate('trainer_id');

    res.status(201).json(populatedSchedule);
  } catch (error) {
    res.status(400).json({ message: "Error creating schedule", error: error.message });
  }
});


export default router;

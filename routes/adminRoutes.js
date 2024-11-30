import express from "express";
import Trainer from "../models/Trainer.js";
import ClassSchedule from "../models/ClassSchedule.js";
import { authenticate } from "../middleware/auth.js";


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
    const schedule = new ClassSchedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;

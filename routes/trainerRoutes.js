import express from "express";
import ClassSchedule from "../models/ClassSchedule.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/my-schedules", authenticate, async (req, res) => {
  try {
    const schedules = await ClassSchedule.find({ trainer_id: req.user._id });
    res.json(schedules);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

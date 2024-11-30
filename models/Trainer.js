// models/Trainer.js
import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
});

export default mongoose.model("Trainer", trainerSchema);

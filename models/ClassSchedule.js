import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: Date,
  time: String,
  trainer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
});

export default mongoose.model("ClassSchedule", scheduleSchema);

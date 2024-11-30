import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  traineeId: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Booking", BookingSchema);

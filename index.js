import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import traineeRoutes from "./routes/traineeRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

app.use("/api/admin", adminRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/trainee", traineeRoutes);
app.use("/api", protectedRoutes);
app.use('/api', bookingRoutes);
app.use('/api/bookings', bookingRoutes);




const userSchema = new mongoose.Schema({ name: String, age: Number });

const UserModel = mongoose.model("gymusers", userSchema);

app.get("/users", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
});






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

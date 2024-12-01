import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS package
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import traineeRoutes from "./routes/traineeRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all origins or specific origins
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/trainee", traineeRoutes);
app.use("/api", protectedRoutes);
app.use('/api', bookingRoutes);
app.use('/api/bookings', bookingRoutes);

// Example route
const userSchema = new mongoose.Schema({ name: String, age: Number });
const UserModel = mongoose.model("gymusers", userSchema);

app.get("/users", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

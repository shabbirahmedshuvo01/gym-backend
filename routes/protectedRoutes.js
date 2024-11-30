import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Example protected route
router.get("/protected", authenticate, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user, // User data from the decoded token
  });
});

export default router;

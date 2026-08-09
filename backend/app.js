const express = require("express");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "JobSphere Backend is Running!"
    });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

module.exports = app;
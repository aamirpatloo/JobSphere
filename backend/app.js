const express = require("express");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

const mongoose = require("mongoose");

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "JobSphere Backend is Running!",
        databaseStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

module.exports = app;
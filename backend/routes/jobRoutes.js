const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a job
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            skills,
            location,
            salary,
            experience
        } = req.body;

        // Check required fields
        if (
            !title ||
            !company ||
            !description ||
            !skills ||
            !location
        ) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Create job
        const job = await Job.create({
            title,
            company,
            description,
            skills,
            location,
            salary,
            experience,
            postedBy: req.user.userId
        });

        res.status(201).json({
            message: "Job posted successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Get all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            jobs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;
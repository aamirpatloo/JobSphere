const express = require("express");
const mongoose = require("mongoose");
const Job = require("../models/Job");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a job (Protected - Recruiter)
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
        if (!title || !company || !description || !skills || !location) {
            return res.status(400).json({
                message: "Please provide title, company, description, skills, and location"
            });
        }

        // Standardize skills as an array of strings
        let skillsArray = skills;
        if (typeof skills === "string") {
            skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        // Create job
        const job = await Job.create({
            title,
            company,
            description,
            skills: skillsArray,
            location,
            salary: salary || "",
            experience: experience || "",
            postedBy: req.user.userId
        });

        res.status(201).json({
            message: "Job posted successfully",
            job
        });

    } catch (error) {
        console.error("Create job error:", error);
        res.status(500).json({
            message: "Server error creating job"
        });
    }
});

// Get all jobs with optional search/filter query parameters
router.get("/", async (req, res) => {
    try {
        const { title, skills, location, experience } = req.query;
        const filter = {};

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (skills) {
            filter.skills = { $regex: skills, $options: "i" };
        }
        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }
        if (experience) {
            filter.experience = { $regex: experience, $options: "i" };
        }

        const jobs = await Job.find(filter)
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error("Get jobs error:", error);
        res.status(500).json({
            message: "Server error fetching jobs"
        });
    }
});

// Get jobs posted by the logged-in user (Recruiter Dashboard)
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error("Get my jobs error:", error);
        res.status(500).json({
            message: "Server error fetching your jobs"
        });
    }
});

// Get single job by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid job ID format"
            });
        }

        const job = await Job.findById(id).populate("postedBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            job
        });

    } catch (error) {
        console.error("Get job details error:", error);
        res.status(500).json({
            message: "Server error fetching job details"
        });
    }
});

// Update a job (Protected - Creator only)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid job ID format"
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Ownership check
        if (job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to update this job"
            });
        }

        const {
            title,
            company,
            description,
            skills,
            location,
            salary,
            experience
        } = req.body;

        if (title) job.title = title;
        if (company) job.company = company;
        if (description) job.description = description;
        if (skills) {
            job.skills = Array.isArray(skills) 
                ? skills 
                : skills.split(",").map(s => s.trim()).filter(Boolean);
        }
        if (location) job.location = location;
        if (salary !== undefined) job.salary = salary;
        if (experience !== undefined) job.experience = experience;

        const updatedJob = await job.save();

        res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {
        console.error("Update job error:", error);
        res.status(500).json({
            message: "Server error updating job"
        });
    }
});

// Delete a job (Protected - Creator only)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid job ID format"
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Ownership check
        if (job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to delete this job"
            });
        }

        await Job.findByIdAndDelete(id);

        // Delete associated applications
        await Application.deleteMany({ job: id });

        res.status(200).json({
            message: "Job and associated applications deleted successfully"
        });

    } catch (error) {
        console.error("Delete job error:", error);
        res.status(500).json({
            message: "Server error deleting job"
        });
    }
});

module.exports = router;
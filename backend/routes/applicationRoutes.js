const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply for a job (POST /api/applications OR POST /api/applications/:jobId)
const handleApply = async (req, res) => {
    try {
        const jobId = req.params.jobId || req.body.jobId || req.body.job;

        if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Please provide a valid job ID"
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Check if user already applied
        const existingApplication = await Application.findOne({
            user: req.user.userId,
            job: jobId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        // Create application
        const application = await Application.create({
            user: req.user.userId,
            job: jobId,
            status: "Applied"
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error("Apply job error:", error);
        res.status(500).json({
            message: "Server error submitting application"
        });
    }
};

router.post("/", authMiddleware, handleApply);
router.post("/:jobId", authMiddleware, handleApply);

// Get my applications (Job Seeker)
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.userId })
            .populate({
                path: "job",
                populate: { path: "postedBy", select: "name email" }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error("Get my applications error:", error);
        res.status(500).json({
            message: "Server error fetching your applications"
        });
    }
});

// Get applicants for a specific job (Recruiter)
router.get("/job/:jobId", authMiddleware, async (req, res) => {
    try {
        const { jobId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format"
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Ownership check: only job recruiter can view applicants
        if (job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Forbidden: You can only view applicants for your own jobs"
            });
        }

        const rawApplications = await Application.find({ job: jobId })
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .lean();

        // Attach profile details for each applicant
        const applications = await Promise.all(
            rawApplications.map(async (app) => {
                if (app.user && app.user._id) {
                    const profile = await Profile.findOne({ user: app.user._id }).lean();
                    return { ...app, profile: profile || null };
                }
                return app;
            })
        );

        res.status(200).json({
            count: applications.length,
            jobTitle: job.title,
            applications
        });

    } catch (error) {
        console.error("Get job applicants error:", error);
        res.status(500).json({
            message: "Server error fetching applicants"
        });
    }
});

// Update application status (Recruiter)
router.put("/:id/status", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID format"
            });
        }

        const allowedStatuses = ["Applied", "Reviewing", "Shortlisted", "Accepted", "Rejected", "Selected"];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: `Status must be one of: ${allowedStatuses.join(", ")}`
            });
        }

        const application = await Application.findById(id).populate("job");
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        // Ownership check: only recruiter who posted the job can update application status
        if (application.job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to update applications for this job"
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error("Update application status error:", error);
        res.status(500).json({
            message: "Server error updating application status"
        });
    }
});

module.exports = router;
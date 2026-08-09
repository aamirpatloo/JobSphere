const express = require("express");
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create or update profile
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            phone,
            skills,
            education,
            experience,
            employmentStatus
        } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.userId },
            {
                user: req.user.userId,
                phone,
                skills,
                education,
                experience,
                employmentStatus
            },
            {
                new: true,
                upsert: true
            }
        );

        res.status(200).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;
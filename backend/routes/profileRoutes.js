const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
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
            employmentStatus,
            bio,
            location
        } = req.body;

        let skillsArray = skills;
        if (typeof skills === "string") {
            skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.userId },
            {
                user: req.user.userId,
                phone: phone || "",
                skills: skillsArray || [],
                education: education || "",
                experience: experience || "",
                employmentStatus: employmentStatus || "",
                bio: bio || "",
                location: location || ""
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        ).populate("user", "name email role");

        res.status(200).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        console.error("Save profile error:", error);
        res.status(500).json({
            message: "Server error saving profile"
        });
    }
});

// Get current logged-in user profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        let profile = await Profile.findOne({
            user: req.user.userId
        }).populate("user", "name email role");

        if (!profile) {
            // Return empty profile object rather than 404 error so UI displays form cleanly
            const user = await User.findById(req.user.userId).select("name email role");
            return res.status(200).json({
                profile: null,
                user
            });
        }

        res.status(200).json({
            profile
        });

    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            message: "Server error fetching profile"
        });
    }
});

module.exports = router;
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        phone: {
            type: String
        },

        skills: {
            type: [String]
        },

        education: {
            type: String
        },

        experience: {
            type: String
        },

        employmentStatus: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Profile", profileSchema);
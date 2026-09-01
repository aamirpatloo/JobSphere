const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/JobSphere";
    const localUri = "mongodb://127.0.0.1:27017/JobSphere";

    try {
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.warn(`Primary MongoDB connection failed (${error.message}). Attempting fallback to local MongoDB...`);
        try {
            const fallbackConn = await mongoose.connect(localUri, {
                serverSelectionTimeoutMS: 5000
            });
            console.log(`Local MongoDB Connected: ${fallbackConn.connection.host}`);
            return fallbackConn;
        } catch (fallbackError) {
            console.error("MongoDB Connection Error:", fallbackError.message);
            process.exit(1);
        }
    }
};

module.exports = connectDB;

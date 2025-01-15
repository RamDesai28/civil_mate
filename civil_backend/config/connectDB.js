const mongoose = require("mongoose");

// MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/authenticationDB"; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {

    });
    console.log("MongoDB connected successfully...");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

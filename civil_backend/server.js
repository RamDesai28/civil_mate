const express = require("express");
const cors = require("cors"); // Import CORS
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

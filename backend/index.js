const express = require('express');
const connectDb = require('./config/db');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Correct CORS setup
app.use(cors());

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect DB
connectDb();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Fix console log
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

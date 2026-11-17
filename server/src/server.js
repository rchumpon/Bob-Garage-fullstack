// ==================================================
// Environment Configuration
// ==================================================

// Load variables from .env
require("dotenv").config();

// ==================================================
// Dependencies
// ==================================================
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sequelize = require("./config/db");

// ==================================================
// Load Models and Relationships
// ==================================================

// Register relationships between User, Service and Booking
require("./models/models");

// ==================================================
// Load Routes
// ==================================================
const userRouter = require("./routes/userRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const siteSettingsRouter = require("./routes/siteSettingsRoutes");
const favouriteRouter = require("./routes/favouriteRoutes");

// ==================================================
// Application Initialization
// ==================================================
const app = express();

// ==================================================
// Global Middleware
// ==================================================
// Add security-related HTTP headers
app.use(helmet());
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded form submissions
app.use(express.urlencoded({ extended: true }));

// Test whether the backend server is running
app.get("/", (req, res) => res.send("server is running"));

// ==================================================
// API Routes
// ==================================================

app.use("/api/user", userRouter);
app.use("/api/service", serviceRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/settings", siteSettingsRouter);
app.use("/api/favourite", favouriteRouter);

// ==================================================
// Server Startup
// ==================================================

const startServer = async () => {
  try {
    // Connect to MySQL
    await sequelize.authenticate();
    console.log("MySQL connected...");

    // Synchronize Sequelize models with MySQL
    await sequelize.sync();

    // Start Express server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    // Handle database connection or synchronization errors
    console.log("MySQL connection failed:", error);
    process.exit(1);
  }
};
startServer();

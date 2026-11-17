const express = require("express");
const serviceRouter = express.Router();

const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const upload = require("../middleware/multer");

const validate = require("../middleware/validate");
const {
  addServiceSchema,
  updateServiceSchema,
  serviceIdSchema,
} = require("../validation/serviceValidation");

const {
  getAllServices,
  getDashboardData,
  addService,
  updateService,
  deleteService,
  toggleServiceAvailability,
} = require("../controllers/serviceController");

// ==================================================
// Service Routes
// ==================================================

// Public route - Anyone can view services
serviceRouter.get("/list", getAllServices);

// Get dashboard data - Admin Only
serviceRouter.get("/dashboard", protect, adminOnly, getDashboardData);

// Protected route - Only admins can add services
serviceRouter.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  validate(addServiceSchema),
  addService,
);

// Admin - Update an existing service
serviceRouter.put(
  "/update/:serviceId",
  protect,
  adminOnly,
  upload.single("image"),
  validate(serviceIdSchema, "params"),
  validate(updateServiceSchema),
  updateService,
);

// Admin - Delete an existing service
serviceRouter.delete(
  "/delete/:serviceId",
  protect,
  adminOnly,
  validate(serviceIdSchema, "params"),
  deleteService,
);

// Admin - Toggle service availability
serviceRouter.post(
  "/toggle/:serviceId",
  protect,
  adminOnly,
  validate(serviceIdSchema, "params"),
  toggleServiceAvailability,
);

module.exports = serviceRouter;

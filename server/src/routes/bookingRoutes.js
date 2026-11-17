const express = require("express");
const bookingRouter = express.Router();

// Authentication middleware
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const validate = require("../middleware/validate");
const {
  checkAvailableSlotsSchema,
  createBookingSchema,
  updateBookingStatusSchema,
} = require("../validation/bookingValidation");

const {
  checkAvailableSlots,
  createBooking,
  getUserBookings,
  getAllBookings,
  changeBookingStatus,
} = require("../controllers/bookingController");

// ==================================================
// Booking Routes
// ==================================================

// Get bookings belonging to the logged-in user
bookingRouter.get("/user", protect, getUserBookings);

// Get all bookings - Admin Only
bookingRouter.get("/list", protect, adminOnly, getAllBookings);

// Check available services for a selected appointment time
bookingRouter.post(
  "/check-availability",
  protect,
  validate(checkAvailableSlotsSchema),
  checkAvailableSlots,
);

// Create a new booking
bookingRouter.post(
  "/create",
  protect,
  validate(createBookingSchema),
  createBooking,
);

// Change booking status - Admin Only
bookingRouter.post(
  "/change-status",
  protect,
  adminOnly,
  validate(updateBookingStatusSchema),
  changeBookingStatus,
);

module.exports = bookingRouter;

const Joi = require("joi");

// ==================================================
// Check Available Slots Validation
// ==================================================
const checkAvailableSlotsSchema = Joi.object({
  bookingDate: Joi.date().iso().greater("now").required(),
});
// ==================================================
// Create Booking Validation
// ==================================================

// Validate booking information submitted by customers
const createBookingSchema = Joi.object({
  // ID of the service being booked
  serviceId: Joi.number().integer().positive().required(),

  // Appointment date and time must be in the future
  bookingDate: Joi.date().iso().greater("now").required(),

  // Manufacturing  year of the vehicle
  vehicleYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required(),

  // Manufacturer of the vehicle
  vehicleMake: Joi.string().trim().min(2).max(50).required(),

  // Model of the vehicle
  vehicleModel: Joi.string().trim().min(1).max(50).required(),

  // Vehicle registration number
  vehicleRegistration: Joi.string().trim().min(2).max(20).required(),

  /*
    ***Regular Expression***
    ^ means Start of the phone number
    \+? means Optional + at the beginning
    [0-9\s()-] means Allows digits, spaces, parentheses and hyphens
    {8, 20} means Between 8 and 20 permitted characters
    $ means End of the phone number
  */
  customerPhone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s()-]{8,20}$/)
    .required()
    .messages({ "string.pattern.base": "Please enter a valid phone number" }),
});

// ==================================================
// Update Booking Status Validation
// ==================================================

// Validate the booking ID and new status
const updateBookingStatusSchema = Joi.object({
  // ID of the booking to update
  bookingId: Joi.number().integer().positive().required(),

  // New booking status
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "cancelled")
    .required(),
});

// ==================================================
// Booking ID Validation
// ==================================================

// Validate the booking ID from URL parameters
const bookingIdSchema = Joi.object({
  bookingId: Joi.number().integer().positive().required(),
});

module.exports = {
  checkAvailableSlotsSchema,
  createBookingSchema,
  updateBookingStatusSchema,
  bookingIdSchema,
};

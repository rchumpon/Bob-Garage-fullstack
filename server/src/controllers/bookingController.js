// ==================================================
// Dependencies
// ==================================================
const Booking = require("../models/bookingModel");
const Service = require("../models/serviceModel");
const User = require("../models/userModel");

// ====================================================
// Check service availability for a given date - Helper
// ====================================================

const checkServiceAvailability = async (serviceId, bookingDate) => {
  // Find an existing booking for the same service
  // at the requested appointment date and time
  const booking = await Booking.findOne({
    where: {
      serviceId,
      bookingDate,
      status: ["pending", "confirmed", "completed"],
    },
  });
  // Return true if no existing booking was found, so the service is available
  // Return false if a matching booking exists, so the service is unavailable
  return booking === null;
};

// ==================================================
// Check available services for a given date and time
// POST - /api/booking/check-availability
// ==================================================

const checkAvailableSlots = async (req, res) => {
  try {
    // Get the requested appointment date and time
    const { bookingDate } = req.body;

    // Retrieve services that are currently available for booking
    const services = await Service.findAll({ where: { isAvailable: true } });

    // Check whether each service is available at
    // the requested appointment date and time
    const availableServicesPromises = services.map(async (service) => {
      // Check for an existing booking
      const isAvailable = await checkServiceAvailability(
        service.serviceId,
        bookingDate,
      );

      // Convert the Sequelize instance into a normal object
      // and add the availability result
      return { ...service.toJSON(), isAvailable };
    });

    // Wait for all availability checks to finish
    let availableServices = await Promise.all(availableServicesPromises);

    // Keep only services that are available
    availableServices = availableServices.filter(
      (service) => service.isAvailable === true,
    );

    return res.status(200).json({ success: true, availableServices });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Create booking - Authenticated User
// POST - /api/booking/create
// ==================================================
const createBooking = async (req, res) => {
  try {
    // Get the logged-in user's ID from JWT middleware
    const userId = req.user.userId;

    // Get the validated booking information from the request body
    const {
      serviceId,
      bookingDate,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleRegistration,
      customerPhone,
    } = req.body;

    // Convert the requested booking date into a Date object
    const requestedDate = new Date(bookingDate);

    // Check whether the booking date is valid
    if (Number.isNaN(requestedDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking date" });
    }

    // Prevent bookings in the past
    if (requestedDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please select a future appointment date and time",
      });
    }

    // Find the selected service in MySQL
    const service = await Service.findByPk(serviceId);

    // Check whether the service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check whether the administrator has enabled the service
    if (!service.isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Service is currently unavailable" });
    }

    // Check whether the service is available at the requested date and time
    const isAvailable = await checkServiceAvailability(serviceId, bookingDate);

    // Prevent booking if the appointment time is already taken
    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "Service is already booked at the selected date and time.",
      });
    }

    // Create a new booking in MySQL
    const booking = await Booking.create({
      userId, // req.user.userId from JWT middleware
      serviceId,
      bookingDate,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleRegistration,
      customerPhone,
      price: service.price, // from MySQL
      status: "pending", // By default in the Booking model
    });

    // Return the newly created booking
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Get user's bookings - Authenticated User
// GET - /api/booking/user
// ==================================================
const getUserBookings = async (req, res) => {
  try {
    // Get the logged-in user's ID
    const userId = req.user.userId;

    // Retrieve bookings belonging to this user
    const bookings = await Booking.findAll({
      where: { userId: userId },
      // Include the service information:
      include: [
        {
          model: Service,
        },
      ],

      // Display the most recent bookings first
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Get all bookings - Admin Only
// GET - /api/booking/list
// ==================================================
const getAllBookings = async (req, res) => {
  try {
    // Retrieve all customer bookings
    const bookings = await Booking.findAll({
      // Include customer and service information
      include: [
        { model: User, attributes: ["userId", "name", "email"] },
        { model: Service },
      ],

      // Display the most recent bookings first
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Change booking status - Admin Only
// POST - /api/booking/change-status
// ==================================================
const changeBookingStatus = async (req, res) => {
  try {
    // Get the validated booking ID and status from the request body
    const { bookingId, status } = req.body;

    // Find the booking in MySQL
    const booking = await Booking.findByPk(bookingId);

    // Check whether the booking exists
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Define the allowed booking status changes
    const allowedTransitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };

    // Check whether the requested status change is allowed
    if (!allowedTransitions[booking.status]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status change",
      });
    }

    // Update the booking status
    booking.status = status;

    // Record the completion date when the service is completed
    if (status === "completed") {
      booking.completedAt = new Date();
    }

    // Save the updated status to MySQL
    await booking.save();

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// Handle unexpected server errors
function internalError(error, res) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal Error - Please try again later",
  });
}

module.exports = {
  checkServiceAvailability,
  checkAvailableSlots,
  createBooking,
  getUserBookings,
  getAllBookings,
  changeBookingStatus,
};

// ==================================================
// Dependencies
// ==================================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// ==================================================
// Booking Model
// ==================================================
const Booking = sequelize.define("Booking", {
  // Primary key for the Booking
  bookingId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // ID of the User who created the booking
  // References the User model through the userId foreign key
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // ID of the Service being booked
  // References the Service model through the serviceId foreign key
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Date and time of the appointment
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  // Manufacturing year of the vehicle
  vehicleYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Manufacturer of the vehicle
  vehicleMake: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  // Model of the vehicle
  vehicleModel: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  // Vehicle registration number
  vehicleRegistration: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  // Phone number provided for this booking
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  // Store the service price when the booking is created
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  // Current status of the booking
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },

  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = Booking;

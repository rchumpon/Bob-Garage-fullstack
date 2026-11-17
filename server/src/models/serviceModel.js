// ==================================================
// Dependencies
// ==================================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// ==================================================
// Service Model
// ==================================================
const Service = sequelize.define(
  "Service",
  {
    serviceId: {
      // Primary key for the Service
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Name of the service
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    // Detailed description of the service
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    // Price of the service
    // DECIMAL is used to avoid floating-point precision issues with money
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },

    duration: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    // URL or path to the service image
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    // Mark whether the service should display a Popular badge
    isPopular: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // Store a list of features included in the service
    features: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    // Match the existing table name in Aiven MySQL
    tableName: "services",
  },
);
module.exports = Service;

// ==================================================
// Dependencies
// ==================================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// ==================================================
// User Model
// ==================================================
const User = sequelize.define(
  "User",
  {
    // Primary Key for the User
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // User's full name
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        // Name cannot be empty
        notEmpty: true,
        // Name must contain between 3 and 30 characters
        len: [3, 30],
      },
    },
    // User's email address used for authentication
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        // Must be a valid email address
        isEmail: true,
        // Email must contain between 5 and 255 characters
        len: [5, 255],
      },
    },

    // Hash user password
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // Determine whether the user has administrator privileges
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // URL or path to the user's profile image
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
  },
  // Automatically adds createdAt and updatedAt fields
  { timestamps: true },
);
module.exports = User;

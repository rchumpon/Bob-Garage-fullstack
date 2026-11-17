// ==================================================
// Dependencies
// ==================================================
const { DataTypes } = require("sequelize");

// Import your existing Sequelize connection
const sequelize = require("../config/db");

// ==================================================
// Site Settings Model
// ==================================================
const SiteSettings = sequelize.define(
  "SiteSettings",
  {
    // Primary key for the SiteSettings
    settingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Homepage full-width background
    // URL of the homepage background image
    heroBackground: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    // Homepage right-side hero image
    // URL of the right-side hero image
    heroImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    // Match the existing table name in Aiven MySQL
    tableName: "sitesettings",
  },
);

module.exports = SiteSettings;

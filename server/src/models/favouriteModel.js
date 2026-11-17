// ==================================================
// Dependencies
// ==================================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// ==================================================
// Favourite Model
// ==================================================
const Favourite = sequelize.define(
  "Favourite",
  {
    // Primary Key for the Favourite
    favouriteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Foreign Key referencing the User
    // Identifies which customer saved the service
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key referencing the Service
    // Identifies which service was saved as a favourite
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,

    // Prevent a user from adding the same service
    // to their favourites more than once
    indexes: [
      {
        unique: true,
        fields: ["userId", "serviceId"],
      },
    ],
  },
);
console.log(
  "Favourite ID type:",
  Favourite.getAttributes().favouriteId.type.toSql(),
);
module.exports = Favourite;

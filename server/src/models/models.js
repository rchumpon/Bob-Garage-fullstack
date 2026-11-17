// ==================================================
// Dependencies
// ==================================================
const User = require("./userModel");
const Service = require("./serviceModel");
const Booking = require("./bookingModel");
const SiteSettings = require("./siteSettingsModel");
const Favourite = require("./favouriteModel");

// ==================================================
// Model Relationships
// ==================================================

// Relationships - one-to-many relationships between User, Service and Booking

// A User can have many Bookings
// Each Booking belongs to one User
User.hasMany(Booking, {
  foreignKey: "userId",
});

// Each Booking belongs to one User
// The userId field in Booking references the User
Booking.belongsTo(User, {
  foreignKey: "userId",
});

// One Service can have multiple Bookings
// Each Booking belongs to one Service
Service.hasMany(Booking, {
  foreignKey: "serviceId",
});

// Each Booking belongs to one Service
// The serviceId field in Booking references the Service
Booking.belongsTo(Service, {
  foreignKey: "serviceId",
});

// A User can have multiple Favourites
// Each Favourite belongs to one User
User.hasMany(Favourite, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// Each Favourite belongs to one User
// The userId field in Favourite references the User
Favourite.belongsTo(User, {
  foreignKey: "userId",
});

// A Service can be saved as a favourite by multiple users
// Each Favourite belongs to one Service.
Service.hasMany(Favourite, {
  foreignKey: "serviceId",
  onDelete: "CASCADE",
});

// Each Favourite belongs to one Service
// The serviceId field in Favourite references the Service
Favourite.belongsTo(Service, {
  foreignKey: "serviceId",
});

// ==================================================
// Site Settings
// ==================================================

// SiteSettings stores the homepage hero background
// and right-side hero image URLs.
//
// No relationships are required because these
// settings belong to the website itself.

module.exports = {
  User,
  Service,
  Booking,
  SiteSettings,
  Favourite,
};

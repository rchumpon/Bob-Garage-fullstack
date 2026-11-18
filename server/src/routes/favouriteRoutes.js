const express = require("express");
const favouriteRouter = express.Router();

// Authentication middleware
const protect = require("../middleware/auth");
const {
  addFavourite,
  removeFavourite,
  getFavourite,
} = require("../controllers/favouriteController");

// ==================================================
// Favourite Routes
// ==================================================

// Retrieve the customer's favourite services
favouriteRouter.get("/list", protect, getFavourite);

// Add a service to the customer's favourites
favouriteRouter.post("/add", protect, addFavourite);

// Remove a service from the customer's favourites
favouriteRouter.delete("/remove/:serviceId", protect, removeFavourite);

module.exports = favouriteRouter;

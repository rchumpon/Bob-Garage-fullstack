// ==================================================
// Dependencies
// ==================================================
const Favourite = require("../models/favouriteModel");
const Service = require("../models/serviceModel");

// ==================================================
// Add Favourite
// POST - /api/favourite/add
// ==================================================

const addFavourite = async (req, res) => {
  try {
    // Get the authenticated user's ID
    const userId = req.user.userId;

    // Get the selected service ID from the request body
    const { serviceId } = req.body;

    // Validated the service ID
    if (!Number.isInteger(Number(!serviceId)) || Number(serviceId) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid service ID",
      });
    }

    // Check if the service exists
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: true,
        message: "Service not found",
      });
    }

    // Check if the service is already in favourites
    const existingFavourite = await Favourite.findOne({
      where: { userId, serviceId },
    });

    if (existingFavourite) {
      return res.status(409).json({
        success: false,
        message: "Service is already in your favourites",
      });
    }

    // Save the service to the customer's favourites
    await Favourite.create({
      userId,
      serviceId,
    });

    return res.status(201).json({
      success: true,
      message: "Service added to favourites",
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Remove Favourite
// DELETE - /api/favourite/remove/:serviceId
// ==================================================

const removeFavourite = async (req, res) => {
  try {
    // Get the authenticated user's ID
    const userId = req.user.userId;

    // Get the service ID from the URL
    const { serviceId } = req.params;

    // Remove the selected service from the user's favourites
    const deleted = await Favourite.destroy({
      where: {
        userId,
        serviceId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service removed from favourites",
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Get Customer Favourites
// GET - /api/favourite/list
// ==================================================

const getFavourite = async (req, res) => {
  try {
    // Get the authenticated user's ID
    const userId = req.user.userId;

    // Retrieve all favourite services for this customer
    const favourites = await Favourite.findAll({
      where: { userId },

      // Include service information
      include: [
        {
          model: Service,
        },
      ],

      // Display the most recently added favourites first
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      favourites,
    });
  } catch (error) {
    return internalError(error, res);
  }
};
function internalError(error, res) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Error - Please try again later",
  });
}

module.exports = {
  addFavourite,
  removeFavourite,
  getFavourite,
};

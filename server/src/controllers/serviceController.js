// ==================================================
// Dependencies
// ==================================================
const Booking = require("../models/bookingModel");
const Service = require("../models/serviceModel");

// Image upload dependencies
// File system module for reading and deleting uploaded images
const fs = require("fs/promises");
const { toFile } = require("@imagekit/nodejs");
const imagekit = require("../config/imageKit");

// ==================================================
// Get all services - Public
// GET - /api/service/list
// ==================================================

const getAllServices = async (req, res) => {
  try {
    // Retrieve all services from MySQL
    const services = await Service.findAll();

    // Return services
    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Get dashboard data - Admin Only
// GET - /api/service/dashboard
// ==================================================

const getDashboardData = async (req, res) => {
  try {
    // Retrieve all services from MySQL
    const services = await Service.findAll();

    // Retrieve all bookings, newest first
    const bookings = await Booking.findAll({
      include: [
        {
          model: Service,
          attributes: ["serviceId", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Calculate number of pending bookings
    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending",
    );

    // Calculate number of completed bookings
    const completedBookings = bookings.filter(
      (booking) => booking.status === "completed",
    );

    // Get the current date
    const now = new Date();

    // Calculate monthly revenue from completed bookings
    const monthlyRevenue = completedBookings
      .filter((booking) => {
        // Skip bookings without a completion date
        if (!booking.completedAt) return false;

        // Get the date when the booking was completed
        const completedDate = new Date(booking.completedAt);

        // Compare the completion month abd year
        return (
          completedDate.getMonth() === now.getMonth() &&
          completedDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, booking) => acc + Number(booking.price), 0);

    // Prepare dashboard statistics
    const dashboardData = {
      totalServices: services.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };
    // Return dashboard data
    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Add service - Admin Only
// POST - /api/service/add
// ==================================================

const addService = async (req, res) => {
  // Store temporary file path for cleanup
  const imageFile = req.file;

  try {
    // Get service details already validated by Joi
    const {
      name,
      description,
      category,
      price,
      duration,
      isAvailable,
      isPopular,
      features,
    } = req.body;

    // Check whether an image was uploaded
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload a service image",
      });
    }

    // Read the uploaded image
    const fileBuffer = await fs.readFile(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.files.upload({
      file: await toFile(fileBuffer, imageFile.originalname),
      fileName: imageFile.originalname,
      folder: "/services",
    });

    // Generate optimized image URL
    const image = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { width: "1280" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    // Save service to MySQL
    const service = await Service.create({
      name,
      description,
      category,
      price,
      duration,
      image,
      isAvailable: isAvailable ?? true,
      isPopular: isPopular ?? false,
      features,
    });

    // Return success response
    return res
      .status(201)
      .json({ success: true, message: "Service added successfully", service });
  } catch (error) {
    return internalError(error, res);
  } finally {
    // Delete temporary uploaded file
    if (imageFile?.path) {
      try {
        await fs.unlink(imageFile.path);
      } catch (error) {
        console.log("Failed to delete temporary image:", error);
      }
    }
  }
};

// ==================================================
// Update service - Admin Only
// PUT - /api/service/update/:serviceId
// ==================================================

// Update an existing service's details and image
const updateService = async (req, res) => {
  // Get the uploaded image, if provided
  const imageFile = req.file;

  try {
    // Get the service ID validated by Joi
    const { serviceId } = req.validated.params;

    // Get updated service details already validated by Joi
    const {
      name,
      description,
      category,
      price,
      duration,
      isAvailable,
      isPopular,
      features,
    } = req.body;

    // Find the service by its primary key
    const service = await Service.findByPk(serviceId);

    // Check whether the service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check whether any details or image were provided
    if (Object.keys(req.body).length === 0 && !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please provide service details or an image to update",
      });
    }

    // ==================================================
    // Update service details
    // ==================================================

    // Update the service name if provided
    if (name !== undefined) {
      service.name = name;
    }

    // Update the service description if provided
    if (description !== undefined) {
      service.description = description;
    }

    // Update the service category if provided
    if (category !== undefined) {
      service.category = category;
    }

    // Update the service price if provided
    if (price !== undefined) {
      service.price = price;
    }

    // Update the service duration if provided
    if (duration !== undefined) {
      service.duration = duration;
    }

    // Update service availability if provided
    if (isAvailable !== undefined) {
      service.isAvailable = isAvailable;
    }

    // Update popular service if provided
    if (isPopular !== undefined) {
      service.isPopular = isPopular;
    }

    // Update features when provided
    if (features !== undefined) {
      service.features = features;
    }

    // ==================================================
    // Update service image
    // ==================================================

    // Check whether a new image was uploaded
    if (imageFile) {
      // Read the uploaded image
      const fileBuffer = await fs.readFile(imageFile.path);

      // Upload the new image to ImageKit
      const response = await imagekit.files.upload({
        file: await toFile(fileBuffer, imageFile.originalname),
        fileName: imageFile.originalname,
        folder: "/services",
      });

      // Generate optimized image URL
      const image = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });

      // Replace the existing service image
      service.image = image;
    }

    // ==================================================
    // Save updated service
    // ==================================================

    // Save the updated service to MySQL
    await service.save();

    // Return the updated service
    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    return internalError(error, res);
  } finally {
    // Delete the temporary uploaded image
    if (imageFile?.path) {
      try {
        await fs.unlink(imageFile.path);
      } catch (error) {
        console.error("Failed to delete temporary image:", error);
      }
    }
  }
};

// ==================================================
// Delete service - Admin Only
// DELETE - /api/service/delete/:serviceId
// ==================================================

// Deleting an existing service from MySQL
const deleteService = async (req, res) => {
  try {
    // Get the service ID validated by Joi
    const { serviceId } = req.validated.params;

    // Find the service by its primary key
    const service = await Service.findByPk(serviceId);

    // Check whether the service exists
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    // If a service already has bookings, deleting it
    // may cause a foreign-key constraint error in MySQL
    // Check whether the service has existing bookings
    const existingBooking = await Booking.findOne({
      where: { serviceId },
    });

    // Prevent deletion if the service has bookings
    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message:
          "Cannot delete this service because it has existing bookings. Mark it as unavailable instead.",
      });
    }

    // Delete the service from MySQL if no bookings exist
    await service.destroy();

    return res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    return internalError(err, res);
  }
};

// ==================================================
// Toggle service availability - Admin Only
// POST - /api/service/toggle/:serviceId
// ==================================================

const toggleServiceAvailability = async (req, res) => {
  try {
    // Get the service ID validated by Joi
    const { serviceId } = req.validated.params;

    // Find the service by its primary key
    const service = await Service.findByPk(serviceId);

    // Check whether the service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Toggle the current availability status
    service.isAvailable = !service.isAvailable;

    // Save the updated availability to MySQL
    await service.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Service availability updated successfully",
      isAvailable: service.isAvailable,
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
  getAllServices,
  getDashboardData,
  addService,
  updateService,
  deleteService,
  toggleServiceAvailability,
};

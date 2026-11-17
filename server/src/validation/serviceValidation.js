const Joi = require("joi");

// ==================================================
// Service Field Validation
// ==================================================

// Shared fields for adding and updating services
const serviceFields = {
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(10),
  category: Joi.string().trim().max(50),
  price: Joi.number().min(0).max(99999999.99).precision(2),
  duration: Joi.string().trim().max(30),
  isAvailable: Joi.boolean(),
  isPopular: Joi.boolean(),

  // Validate the list of features included in a service
  features: Joi.array().items(Joi.string().trim().min(2).max(150)).max(20),
};

// ==================================================
// Add Service Validation
// ==================================================

// Add Service - Required fields
const addServiceSchema = Joi.object({
  ...serviceFields,
  name: serviceFields.name.required(),
  description: serviceFields.description.required(),
  category: serviceFields.category.required(),
  price: serviceFields.price.required(),
  duration: serviceFields.duration.required(),
  isAvailable: serviceFields.isAvailable.default(true),
  isPopular: serviceFields.isPopular.default(false),

  // New services have an empty feature list by default
  features: serviceFields.features.default([]),
});

// ==================================================
// Update Service Validation
// ==================================================
const updateServiceSchema = Joi.object({
  ...serviceFields,
});

// ==================================================
// Service ID Validation
// ==================================================

// Validate the service ID from URL parameters
const serviceIdSchema = Joi.object({
  serviceId: Joi.number().integer().positive().required(),
});

module.exports = { addServiceSchema, updateServiceSchema, serviceIdSchema };

// Note: Because we use Multer to upload images, Joi will validate the text fields in req.body. The uploaded image will be validated separately.

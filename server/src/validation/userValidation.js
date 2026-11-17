const Joi = require("joi");

// ==================================================
// Register User Validation
// ==================================================
const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

// ==================================================
// Login User Validation
// ==================================================
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };

// Note: isAdmin is deliberately excluded. Public users must not be able to assign themselves administrator privileges.

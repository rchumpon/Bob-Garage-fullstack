// ==================================================
// Validate Request Middleware
// ==================================================
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    // Select the part of the request to validate
    const data = req[property];

    // Convert the features JSON string into an array
    // Only applies to request bodies containing features
    if (property === "body" && typeof data?.features === "string") {
      try {
        data.features = JSON.parse(data.features);
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid features format" });
      }
    }

    // Validate the selected part of the request
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
    });

    // Return validation errors if any fields are invalid
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Store validated data for later middleware
    if (property === "body") {
      req.body = value;
    } else {
      req.validated = {
        ...req.validated,
        [property]: value,
      };
    }

    // continue to the next middleware
    next();
  };
};

module.exports = validate;

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  // Retrieve the JWT from the Authorization header
  const token = req.headers.authorization;

  // Reject the request if no authentication token was provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied! No token provided",
    });
  }

  try {
    // Verify token using JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extrat the user's ID from the decoded JWT payload
    const userId = decoded.userId;

    // Deny the request if the JWT does not contain a valid user ID
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    // Find the authenticated user in database
    req.user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });

    // Check whether the user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Continue to controller
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;

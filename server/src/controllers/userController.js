// ==================================================
// Dependencies
// ==================================================
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Image upload dependencies
// File system module for reading and deleting uploaded images
const fs = require("fs/promises");
const { toFile } = require("@imagekit/nodejs");
const imagekit = require("../config/imageKit");

// ==================================================
// Generate JWT token
// ==================================================

// Generate a JWT token using the user's ID
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ==================================================
// Get user data using token (JWT)
// GET - /api/user/data
// ==================================================

const getUserData = async (req, res) => {
  try {
    // We won't send user data in the request.
    // The user data will be added through the protect middleware before being executed to controller
    const { user } = req;
    res.status(200).json({ success: true, user });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Register user
// POST - /api/user/register
// ==================================================

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Get user registration details already validated by Joi
    const { name, email, password } = req.body;

    // Normalise email
    const normalizedEmail = email.trim().toLowerCase();

    // Check whether a user with the same email already exists
    const userExists = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in the database
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate a JWT token using the newly created user's ID
    const token = generateToken(user.userId.toString());

    // Return the token to the client
    return res.status(201).json({ success: true, token });
  } catch (error) {
    // Handle unexpected server errors
    return internalError(error, res);
  }
};

// ==================================================
// Login user
// POST - /api/user/login
// ==================================================

// Authenticate an existing user
const loginUser = async (req, res) => {
  try {
    // Get the user's login details from the request body
    const { email, password } = req.body;

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find the user by their email address
    const user = await User.findOne({ where: { email: normalizedEmail } });

    // Check whether the user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid login details" });
    }
    // Compare the provided password with the hashed password
    // stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check whether the passwords match
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid login details" });
    }
    // Generate a JWT token using the user's ID
    const token = generateToken(user.userId.toString());
    // Return the token to the client
    res.status(200).json({ success: true, token });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Update user profile image - Admin Only
// POST - /api/user/update-image
// ==================================================

const updateUserImage = async (req, res) => {
  // Store temporary file path for cleanup
  const imageFile = req.file;

  try {
    // Get the logged-in user's ID
    const userId = req.user.userId;

    // Check whether an image was uploaded
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Find the logged-in user
    const user = await User.findByPk(userId);

    // Check whether the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Read the uploaded image
    const fileBuffer = await fs.readFile(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.files.upload({
      file: await toFile(fileBuffer, imageFile.originalname),
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // Generate optimized image URL
    const image = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { width: "400" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    // Update the user's profile image
    user.image = image;

    // Save the updated image URL to MySQL
    await user.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      image,
    });
  } catch (error) {
    return internalError(error, res);
  } finally {
    // Delete the temporary uploaded file
    if (imageFile) {
      try {
        await fs.unlink(imageFile.path);
      } catch (cleanupError) {
        console.error("Failed to delete temporary image:", cleanupError);
      }
    }
  }
};

// ==================================================
// Internal Error Handler
// ==================================================

// Handle unexpected server errors
function internalError(error, res) {
  // Log the error in the server console
  console.error(error);
  // Return an HTTP 500 response to the client
  return res.status(500).json({
    success: false,
    message: "Internal Error - Please try again later",
  });
}

module.exports = { registerUser, loginUser, getUserData, updateUserImage };

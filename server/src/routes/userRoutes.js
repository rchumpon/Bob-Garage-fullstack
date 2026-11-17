const express = require("express");
const userRouter = express.Router();

const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const upload = require("../middleware/multer");

const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validation/userValidation");
const {
  getUserData,
  registerUser,
  loginUser,
  updateUserImage,
} = require("../controllers/userController");

// ==================================================
// User Routes
// ==================================================

// Retrieve the authenticated user's data
userRouter.get("/data", protect, getUserData);

// Register a new user
userRouter.post("/register", validate(registerSchema), registerUser);

// Log in an existing user
userRouter.post("/login", validate(loginSchema), loginUser);

// Update user profile image
userRouter.post(
  "/update-image",
  protect,
  adminOnly,
  upload.single("image"),
  updateUserImage,
);

module.exports = userRouter;

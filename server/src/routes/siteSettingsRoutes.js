const express = require("express");
const siteSettingsRouter = express.Router();

// ==================================================
// Middleware
// ==================================================
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const upload = require("../middleware/multer");
const {
  getHeroSettings,
  updateHeroBackground,
  updateHeroImage,
} = require("../controllers/siteSettingsController");

// ==================================================
// Settings Routes
// ==================================================

// Public - Get homepage hero images
siteSettingsRouter.get("/hero", getHeroSettings);

// Admin Only - Update hero background image
siteSettingsRouter.put(
  "/hero/background",
  protect,
  adminOnly,
  upload.single("image"),
  updateHeroBackground,
);

// Admin Only - Update right-side hero image
siteSettingsRouter.put(
  "/hero/image",
  protect,
  adminOnly,
  upload.single("image"),
  updateHeroImage,
);

module.exports = siteSettingsRouter;

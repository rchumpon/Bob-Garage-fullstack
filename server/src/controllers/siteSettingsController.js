// ==================================================
// Dependencies
// ==================================================

// File system module for reading and deleting uploaded images
const fs = require("fs/promises");

// Convert image buffers into files for ImageKit
const { toFile } = require("@imagekit/nodejs");

// Import existing ImageKit configuration
const imagekit = require("../config/imageKit");

// Import Site Settings model
const SiteSettings = require("../models/siteSettingsModel");

// ==================================================
// Get Homepage Hero Settings - Public
// GET - /api/settings/hero
// ==================================================

const getHeroSettings = async (req, res) => {
  try {
    // Retrieve the homepage settings
    const settings = await SiteSettings.findByPk(1);

    return res.status(200).json({
      success: true,
      heroBackground: settings?.heroBackground || null,
      heroImage: settings?.heroImage || null,
    });
  } catch (error) {
    return internalError(error, res);
  }
};

// ==================================================
// Helper - Upload and save hero image
// ==================================================

const uploadHeroImage = async (req, res, field) => {
  const imageFile = req.file;

  try {
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }

    // Read temporary image file
    const fileBuffer = await fs.readFile(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.files.upload({
      file: await toFile(fileBuffer, imageFile.originalname),
      fileName: imageFile.originalname,
      folder: "/hero",
    });

    // Generate optimized image URL
    const imageUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { width: field === "heroBackground" ? "1920" : "800" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Create settings record if it doesn't exist
    const [settings] = await SiteSettings.findOrCreate({
      where: { settingId: 1 },
      defaults: {
        heroBackground: null,
        heroImage: null,
      },
    });

    // Update only the selected image
    await settings.update({
      [field]: imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Hero image updated successfully",
      heroBackground: settings.heroBackground,
      heroImage: settings.heroImage,
    });
  } catch (error) {
    return internalError(error, res);
  } finally {
    // Remove temporary uploaded file
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
// Update Hero Background - Admin Only
// PUT - /api/settings/hero/background
// ==================================================

const updateHeroBackground = async (req, res) => {
  return uploadHeroImage(req, res, "heroBackground");
};

// ==================================================
// Update Right-Side Hero Image - Admin Only
// PUT - /api/settings/hero/image
// ==================================================

const updateHeroImage = async (req, res) => {
  return uploadHeroImage(req, res, "heroImage");
};

// ==================================================
// Handle Unexpected Server Errors
// ==================================================

function internalError(error, res) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Error - Please try again later",
  });
}
module.exports = {
  getHeroSettings,
  updateHeroBackground,
  updateHeroImage,
};

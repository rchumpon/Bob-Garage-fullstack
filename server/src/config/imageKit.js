// ==================================================
// Dependencies
// ==================================================

const ImageKit = require("@imagekit/nodejs").default;

// ==================================================
// ImageKit Configuration
// ==================================================

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

module.exports = imagekit;

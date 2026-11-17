const multer = require("multer");

// ==================================================
// Multer Configuration
// ==================================================

// Store uploaded files temporarily on disk
const upload = multer({ storage: multer.diskStorage({}) });

module.exports = upload;

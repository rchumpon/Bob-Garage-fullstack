// ==================================================
// Admin Authorization Middleware
// ==================================================

const adminOnly = (req, res, next) => {
  // Check whether the authenticated user is an admin
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access Denied! Admin only",
    });
  }
  // Continue to the next middleware
  next();
};

module.exports = adminOnly;

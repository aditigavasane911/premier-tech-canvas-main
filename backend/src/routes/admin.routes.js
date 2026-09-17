const express = require("express");
const router = express.Router();
const { login, refreshToken,  logout,
  checkAuth,
} = require("../controllers/admin.controller");
const {
  getEnquiries,
  deleteEnquiry,
  updateEnquiryStatus,
} = require("../controllers/enquiry.controller");
const { protect } = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window`
  message: { message: "Too many login attempts from this IP, please try again after 15 minutes" },
});

// Public route for login
router.post("/login", loginLimiter, login);

// Public route for refreshing token
router.post("/refresh", refreshToken);

// Protected route for logout
router.post("/logout", protect, logout);

// Protected route for fetching callbacks/enquiries
router.get("/callbacks", protect, getEnquiries);

// Protected route for deleting a callback
router.delete("/callbacks/:id", protect, deleteEnquiry);

// Protected route for updating callback status
router.patch("/callbacks/:id/status", protect, updateEnquiryStatus);

// Protected route for checking auth state
router.get("/check", protect, checkAuth);

module.exports = router;

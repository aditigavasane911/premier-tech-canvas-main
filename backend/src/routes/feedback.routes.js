const express = require("express");
const router = express.Router();
const { submitFeedback, getPublicFeedbacks } = require("../controllers/feedback.controller");
const rateLimit = require("express-rate-limit");

// Rate limit: 5 feedback submissions per 15 minutes per IP
const feedbackSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many feedback submissions from this IP. Please wait a few minutes." },
});

// Public routes (no authentication required)
router.post("/", feedbackSubmitLimiter, submitFeedback);
router.get("/", getPublicFeedbacks);

module.exports = router;

const express = require("express");
const router = express.Router();
const { submitComment, getPublicComments } = require("../controllers/comment.controller");
const rateLimit = require("express-rate-limit");

// Rate limit: 5 comment submissions per 15 minutes per IP
const commentSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many comment submissions from this IP. Please wait a few minutes." },
});

// Public routes (no authentication required)
router.post("/", commentSubmitLimiter, submitComment);
router.get("/", getPublicComments);

module.exports = router;

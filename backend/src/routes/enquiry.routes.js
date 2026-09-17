const express = require("express");
const router = express.Router();
const { submitEnquiry } = require("../controllers/enquiry.controller");
const rateLimit = require("express-rate-limit");

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 enquiries per `window`
  message: { message: "Too many callback requests from this IP, please try again after an hour" },
});

// Public route
router.post("/", enquiryLimiter, submitEnquiry);

module.exports = router;

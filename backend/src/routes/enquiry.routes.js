const express = require("express");
const router = express.Router();
const { submitEnquiry } = require("../controllers/enquiry.controller");

// Public route
router.post("/", submitEnquiry);

module.exports = router;

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/admin.controller');
const { getEnquiries, deleteEnquiry, updateEnquiryStatus } = require('../controllers/enquiry.controller');
const { protect } = require('../middleware/auth.middleware');

// Public route for login
router.post('/login', login);

// Protected route for fetching callbacks/enquiries
router.get('/callbacks', protect, getEnquiries);

// Protected route for deleting a callback
router.delete('/callbacks/:id', protect, deleteEnquiry);

// Protected route for updating callback status
router.patch('/callbacks/:id/status', protect, updateEnquiryStatus);

module.exports = router;

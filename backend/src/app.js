const express = require('express');
const cors = require('cors');
const enquiryRoutes = require('./routes/enquiry.routes');
const adminRoutes = require('./routes/admin.routes'); // I added this for the admin system
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/callback', enquiryRoutes); // Mapping /api/callback to enquiry.routes for the customer flow
app.use('/api/admin', adminRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;

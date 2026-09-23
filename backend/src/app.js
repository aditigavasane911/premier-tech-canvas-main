const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const enquiryRoutes = require("./routes/enquiry.routes");
const adminRoutes = require("./routes/admin.routes"); // I added this for the admin system
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

// Set security HTTP headers
app.use(helmet());

// Implement CORS
const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed for origin: " + origin));
    },
    credentials: true,
  }),
);

// Global Rate Limiting: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again in 15 minutes.",
});
app.use("/api", limiter);

// Cookie parser
app.use(cookieParser());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "32kb" }));

// Data sanitization against NoSQL query injection
// Note: express-mongo-sanitize is incompatible with Express 5. Mongoose 6+ provides its own protections.
// Routes
app.use("/api/callback", enquiryRoutes); // Mapping /api/callback to enquiry.routes for the customer flow
app.use("/api/admin", adminRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;

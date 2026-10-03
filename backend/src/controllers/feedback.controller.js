const Feedback = require("../models/feedback.model");

// Public: Submit a new feedback and 5-star rating (no sign-in required)
exports.submitFeedback = async (req, res, next) => {
  try {
    const { name, email, role, rating, quote, course, website } = req.body;

    // Honeypot anti-spam check: bots automatically fill out invisible fields
    if (website) {
      return res.status(200).json({
        message: "Thank you for your feedback!",
      });
    }

    // Input validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: "A valid email address is required." });
    }

    if (!quote || typeof quote !== "string" || !quote.trim()) {
      return res.status(400).json({ message: "Feedback comment is required." });
    }

    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5 || !Number.isInteger(numericRating)) {
      return res.status(400).json({ message: "Rating must be an integer between 1 and 5." });
    }

    const newFeedback = new Feedback({
      name: name.trim().slice(0, 80),
      email: email.trim().toLowerCase().slice(0, 254),
      role: role && typeof role === "string" && role.trim() ? role.trim().slice(0, 80) : "Student",
      rating: numericRating,
      quote: quote.trim().slice(0, 1000),
      course: course && typeof course === "string" ? course.trim().slice(0, 80) : undefined,
      status: "Approved", // Auto-approved by default; can be moderated in admin panel
    });

    const saved = await newFeedback.save();

    return res.status(201).json({
      message: "Feedback submitted successfully! Thank you for rating us.",
      feedback: (() => {
        const publicFeedback = saved.toObject();
        delete publicFeedback.email;
        return publicFeedback;
      })(),
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get all approved feedbacks for display on the website
exports.getPublicFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({ status: "Approved" })
      .select("-email")
      .sort({ submittedAt: -1 })
      .limit(60);
    return res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

// Admin: Get all feedbacks including pending/hidden
exports.getAdminFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    return res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

// Admin: Update feedback status (Approved, Pending, Hidden)
exports.updateFeedbackStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Pending", "Hidden"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updated = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete a feedback
exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    return res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    next(error);
  }
};

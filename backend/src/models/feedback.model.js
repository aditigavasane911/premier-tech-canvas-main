const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  role: { type: String, trim: true, maxlength: 80, default: "Student" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  quote: { type: String, required: true, trim: true, maxlength: 1000 },
  course: { type: String, trim: true, maxlength: 80 },
  status: { type: String, enum: ["Approved", "Pending", "Hidden"], default: "Approved" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);

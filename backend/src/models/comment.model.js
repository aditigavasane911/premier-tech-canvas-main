const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, trim: true, maxlength: 120, default: "" },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  adminReply: { type: String, trim: true, maxlength: 1000, default: "" },
  status: { type: String, enum: ["Approved", "Pending", "Hidden"], default: "Pending" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);

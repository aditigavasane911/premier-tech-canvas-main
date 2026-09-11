const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  enquiryFor: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "Pending" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enquiry", EnquirySchema);

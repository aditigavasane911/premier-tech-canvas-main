const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  refreshToken: { type: String }, // For refresh token rotation/revocation
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", AdminSchema);

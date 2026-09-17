const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",
      { expiresIn: "7d" }
    );

    admin.refreshToken = refreshToken;
    await admin.save();

    res.status(200).json({ token, refreshToken, message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret");
    const admin = await Admin.findById(decoded.adminId);

    if (!admin || admin.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "15m" }
    );

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { adminId } = req.adminData;
    const admin = await Admin.findById(adminId);
    if (admin) {
      admin.refreshToken = null;
      await admin.save();
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

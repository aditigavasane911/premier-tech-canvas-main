const Comment = require("../models/comment.model");

// Public: Submit a new comment (no sign-in required)
exports.submitComment = async (req, res, next) => {
  try {
    const { name, email, message, website } = req.body;

    // Honeypot anti-spam check
    if (website) {
      return res.status(200).json({
        message: "Thank you for your comment!",
      });
    }

    // Input validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Comment message is required." });
    }

    const newComment = new Comment({
      name: name.trim().slice(0, 80),
      email: email && typeof email === "string" ? email.trim().slice(0, 120) : "",
      message: message.trim().slice(0, 1000),
      status: "Pending", // Requires admin approval before public display
    });

    const saved = await newComment.save();

    return res.status(201).json({
      message: "Comment submitted successfully! It will appear after admin approval.",
      comment: saved,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get all approved comments for display on the website
exports.getPublicComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ status: "Approved" })
      .sort({ submittedAt: -1 })
      .limit(100);
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Admin: Get all comments including pending/hidden
exports.getAdminComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().sort({ submittedAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Admin: Reply to a comment
exports.replyToComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminReply } = req.body;

    if (!adminReply || typeof adminReply !== "string" || !adminReply.trim()) {
      return res.status(400).json({ message: "Reply message is required." });
    }

    const updated = await Comment.findByIdAndUpdate(
      id,
      { adminReply: adminReply.trim().slice(0, 1000) },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// Admin: Update comment status (Approved, Pending, Hidden)
exports.updateCommentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Pending", "Hidden"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updated = await Comment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete a comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Comment not found." });
    }
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    next(error);
  }
};

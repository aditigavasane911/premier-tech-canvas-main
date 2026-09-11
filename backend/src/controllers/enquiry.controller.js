const Enquiry = require("../models/enquiry.model");

exports.submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, enquiryFor, message } = req.body;

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      enquiryFor,
      message,
    });

    await newEnquiry.save();

    res.status(201).json({ message: "Callback request submitted successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ submittedAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    next(error);
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(updatedEnquiry);
  } catch (error) {
    next(error);
  }
};

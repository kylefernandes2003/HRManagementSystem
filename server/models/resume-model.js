const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;

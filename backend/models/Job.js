const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  description: String,
  postedDate: {
    type: Date,
    default: Date.now,
  },
  yearsOfExperience: Number,
  location: String,
  keyResponsibilities: [String],
  skillsAndExperience: [String],
  perksAndBenefits: [String],
});

module.exports = mongoose.model("Job", jobSchema);

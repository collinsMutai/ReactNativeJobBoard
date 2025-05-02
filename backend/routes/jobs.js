const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job
router.post("/", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    category: req.body.category,
    image: req.body.image,
    description: req.body.description,
    postedDate: req.body.postedDate,
    yearsOfExperience: req.body.yearsOfExperience,
    location: req.body.location,
    keyResponsibilities: req.body.keyResponsibilities,
    skillsAndExperience: req.body.skillsAndExperience,
    perksAndBenefits: req.body.perksAndBenefits,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

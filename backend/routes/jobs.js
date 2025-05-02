const express = require("express");
const multer = require("multer");
const path = require("path");
const Job = require("../models/Job");

const router = express.Router();

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST a new job with optional image upload
router.post("/", upload.single("image"), async (req, res) => {
    console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);

  try {
    const {
      title,
      category,
      description,
      postedDate,
      yearsOfExperience,
      location,
      keyResponsibilities,
      skillsAndExperience,
      perksAndBenefits,
    } = req.body;

    const job = new Job({
      title,
      category,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : req.body.imageUrl || "",
      description,
      postedDate,
      yearsOfExperience,
      location,
      keyResponsibilities: JSON.parse(keyResponsibilities || "[]"),
      skillsAndExperience: JSON.parse(skillsAndExperience || "[]"),
      perksAndBenefits: JSON.parse(perksAndBenefits || "[]"),
    });

    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ UPDATE job (no image update here)
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

// ✅ DELETE job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

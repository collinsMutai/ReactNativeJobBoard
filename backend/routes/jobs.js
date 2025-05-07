const express = require("express");
const multer = require("multer");
const path = require("path");
const Job = require("../models/Job");

const router = express.Router();

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store images in 'uploads' folder. Ensure this folder exists.
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Create a unique file name using the current timestamp and original file name
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Save the file with the unique name
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true); // Accept the file
    } else {
      return cb(new Error("Only image files are allowed"), false); // Reject the file if not an image
    }
  },
});

// ✅ GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST a new job with optional image upload (local storage)
router.post("/", upload.single("image"), async (req, res) => {
  console.log("REQ FILE:", req.file); // Log the file details (image uploaded)
  console.log("REQ BODY:", req.body); // Log the form data (job details)

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

    // Store the image URL (relative path to the uploads folder)
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl || "";

    // Create a new job entry
    const job = new Job({
      title,
      category,
      image: imageUrl, // Store the relative URL for the uploaded image
      description,
      postedDate,
      yearsOfExperience,
      location,
      keyResponsibilities: JSON.parse(keyResponsibilities || "[]"),
      skillsAndExperience: JSON.parse(skillsAndExperience || "[]"),
      perksAndBenefits: JSON.parse(perksAndBenefits || "[]"),
    });

    // Save the job to the database
    const newJob = await job.save();
    res.status(201).json(newJob); // Respond with the newly created job
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  console.log("PUT /:id body:", req.body);

  try {
    const body = { ...req.body };

    // ✅ Ensure arrays are properly parsed if sent as strings
    ["keyResponsibilities", "skillsAndExperience", "perksAndBenefits"].forEach(
      (field) => {
        if (typeof body[field] === "string") {
          try {
            body[field] = JSON.parse(body[field]);
          } catch (e) {
            console.warn(`Invalid JSON for field ${field}:`, body[field]);
            body[field] = [];
          }
        }
      }
    );

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("❌ Update Error:", error.message);
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

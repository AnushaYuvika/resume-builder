const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();

router.post("/", async (req,res) => {
  try {
    const resume = new Resume(req.body);

    const savedResume = await resume.save();

    res.status(201).json(savedResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save resume",
      error: error.message
    })
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.status(200).json(resume);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update resume",
      error: error.message
    });
  }
});

module.exports = router;
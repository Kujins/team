const express = require("express");
const router = express.Router();

const SensoryProfile = require("../models/SensoryProfile");

// GET all sensory profiles with optional patientId filter
router.get("/sensory-profile", async (req, res) => {
  try {
    const filter = {};
    if (req.query.patientId) {
      filter.patientId = req.query.patientId;
    }

    const assessments = await SensoryProfile.find(filter).sort({
      testDate: -1,
    });
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching sensory profiles:", error);
    res.status(500).json({ message: "Error fetching assessments" });
  }
});

// POST new sensory profile
router.post("/sensory-profile", async (req, res) => {
  try {
    const newProfile = new SensoryProfile(req.body);
    const savedProfile = await newProfile.save();
    console.log("Document saved successfully:", savedProfile);
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error saving assessment:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "A duplicate assessment for this patient, category, and test date already exists.",
      });
    }

    // Don't expose the full error object
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// DELETE sensory profile by ID
router.delete("/sensory-profile/:id", async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const deletedAssessment = await SensoryProfile.findByIdAndDelete(
      assessmentId
    );

    if (!deletedAssessment) {
      return res.status(404).json({ message: "Assessment not found." });
    }

    res.status(200).json({ message: "Assessment deleted successfully." });
  } catch (error) {
    console.error("Error deleting assessment:", error);
    res.status(500).json({ message: "Error deleting assessment." });
  }
});

// GET sensory profile by ID
router.get("/sensory-profile/:id", async (req, res) => {
  try {
    const assessment = await SensoryProfile.findById(req.params.id);
    console.log("DATA BEING SENT TO EDIT PAGE:", assessment);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json(assessment);
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({ message: "Error fetching assessment" });
  }
});

// PUT update sensory profile by ID
router.put("/sensory-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedAssessment = await SensoryProfile.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(updatedAssessment);
  } catch (error) {
    console.error("Error updating assessment:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This update would create a duplicate record.",
      });
    }

    res.status(500).json({ message: "Error updating assessment" });
  }
});

module.exports = router;

// backend/controllers/medicalAssessmentController.js

const MedicalAssessment = require('../models/MedicalAssessment'); // MedicalAssessment model එක import කරගැනීම

// @desc    Get all medical assessments
// @route   GET /api/medicalAssessments
// @access  Public (ඔබට authentication අවශ්‍ය නම් මෙය වෙනස් කළ හැක)
const getMedicalAssessments = async (req, res) => {
    try {
        const assessments = await MedicalAssessment.find();
        res.status(200).json(assessments);
    } catch (error) {
        console.error('Error fetching medical assessments:', error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get single medical assessment by ID
// @route   GET /api/medicalAssessments/:id
// @access  Public
const getMedicalAssessmentById = async (req, res) => {
    try {
        const assessment = await MedicalAssessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: 'Medical assessment not found' });
        }
        res.status(200).json(assessment);
    } catch (error) {
        console.error('Error fetching single medical assessment:', error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Create new medical assessment
// @route   POST /api/medicalAssessments
// @access  Public
const createMedicalAssessment = async (req, res) => {
    try {
        const {
            patientRegNo, assessmentDate, assessedBy, purposeOfAssessment, presentComplaint,
            gestationalHistory, birthHistory, postNatalHistory, immunizationHistory,
            developmentalHistory, familyHistoryMedical, socialHistory, currentMedication,
            previousInterventions, feedingHistory, headControl, sitting, standing, walking,
            visionAssessment, hearingAssessment, seizures, oralMotorIssues, abnormalMovements,
            abnormalMovementsDetails, dressing, feeding, toileting, grooming, bathing,
            socialInteraction, playActivity, leisureActivity, sleepPattern, eatingPattern,
            behavioralIssues, behavioralIssuesDetails, otherConcerns, physiotherapy,
            speechAndLanguageTherapy, occupationalTherapy, psychologicalCounseling,
            specialEducation, otherTherapyNeeds
        } = req.body;

        // Basic validation (more comprehensive validation can be added with Joi/Express-validator)
        if (!patientRegNo || !assessmentDate || !assessedBy || !purposeOfAssessment || !presentComplaint) {
            return res.status(400).json({ message: 'Please include all required fields for general information.' });
        }

        // Check if a medical assessment for this patientRegNo already exists
        const existingAssessment = await MedicalAssessment.findOne({ patientRegNo });
        if (existingAssessment) {
            return res.status(400).json({ message: 'A medical assessment for this patient registration number already exists.' });
        }

        const medicalAssessment = await MedicalAssessment.create({
            patientRegNo, assessmentDate, assessedBy, purposeOfAssessment, presentComplaint,
            gestationalHistory, birthHistory, postNatalHistory, immunizationHistory,
            developmentalHistory, familyHistoryMedical, socialHistory, currentMedication,
            previousInterventions, feedingHistory, headControl, sitting, standing, walking,
            visionAssessment, hearingAssessment, seizures, oralMotorIssues, abnormalMovements,
            abnormalMovementsDetails, dressing, feeding, toileting, grooming, bathing,
            socialInteraction, playActivity, leisureActivity, sleepPattern, eatingPattern,
            behavioralIssues, behavioralIssuesDetails, otherConcerns, physiotherapy,
            speechAndLanguageTherapy, occupationalTherapy, psychologicalCounseling,
            specialEducation, otherTherapyNeeds
        });

        res.status(201).json(medicalAssessment);
    } catch (error) {
        console.error('Error creating medical assessment:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error: Patient registration number must be unique.' });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Update medical assessment
// @route   PUT /api/medicalAssessments/:id
// @access  Public
const updateMedicalAssessment = async (req, res) => {
    try {
        const updatedAssessment = await MedicalAssessment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
        if (!updatedAssessment) {
            return res.status(404).json({ message: 'Medical assessment not found' });
        }
        res.status(200).json(updatedAssessment);
    } catch (error) {
        console.error('Error updating medical assessment:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Delete medical assessment
// @route   DELETE /api/medicalAssessments/:id
// @access  Public
const deleteMedicalAssessment = async (req, res) => {
    try {
        const assessment = await MedicalAssessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: 'Medical assessment not found' });
        }

        await MedicalAssessment.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Medical assessment removed' });
    } catch (error) {
        console.error('Error deleting medical assessment:', error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    getMedicalAssessments,
    getMedicalAssessmentById,
    createMedicalAssessment,
    updateMedicalAssessment,
    deleteMedicalAssessment,
};
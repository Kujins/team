// backend/routes/medicalAssessmentRoutes.js

const express = require('express');
const router = express.Router();
const {
    getMedicalAssessments,
    getMedicalAssessmentById,
    createMedicalAssessment,
    updateMedicalAssessment,
    deleteMedicalAssessment,
} = require('../controllers/medicalAssessmentController');

// Define routes for medical assessments
router.get('/', getMedicalAssessments);
router.post('/', createMedicalAssessment);
router.route('/:id')
    .get(getMedicalAssessmentById)
    .put(updateMedicalAssessment)
    .delete(deleteMedicalAssessment);

module.exports = router;
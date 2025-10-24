
const express = require('express');
const router = express.Router();



const {
    getAssessments, 
    getAssessmentById,
    createAssessment,
    updateAssessment,
    deleteAssessment,
} = require('../controllers/therapyAssessmentController');



router.get('/', getAssessments); 
                              
router.post('/', createAssessment); 


router.route('/:id')
    .get(getAssessmentById)   
    .put(updateAssessment)   
    .delete(deleteAssessment); 

module.exports = router; 

const TherapyAssessment = require('../models/TherapyAssessment');




const getAssessments = async (req, res) => {
    try {
        const assessments = await TherapyAssessment.find();
        res.status(200).json(assessments);
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ message: error.message });
    }
};




const getAssessmentById = async (req, res) => {
    try {
        const assessment = await TherapyAssessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }
        res.status(200).json(assessment);
    } catch (error) {
        console.error('Error fetching single assessment:', error);
        res.status(500).json({ message: error.message });
    }
};




const createAssessment = async (req, res) => {
    
    const {
        name, dob, gender, age, regNo, languageUsed, primaryCarer,
        medicalDiagnosis, communicationDiagnosis, familyHistory,
        hearing, vision, siblings, motorDevelopment, speechRegression,
        assessmentDate, accessBy, nameResponding, canWaitTurn, canTakeTurns,
        prerequisiteSkills, communicationSkills, languageSkills, speechSkills, oralMotorAssessment
    } = req.body;

    
    if (!name || !dob || !gender || !age || !regNo || !languageUsed || !primaryCarer) {
        return res.status(400).json({ message: 'Please fill in all primary required fields (Patient Name, DOB, Gender, Age, Reg No, Language Used, Primary Carer)' });
    }

    try {
        const newAssessment = await TherapyAssessment.create({
            name, dob, gender, age, regNo, languageUsed, primaryCarer,
            medicalDiagnosis, communicationDiagnosis, familyHistory,
            hearing, vision, siblings, motorDevelopment, speechRegression,
            assessmentDate, accessBy, nameResponding, canWaitTurn, canTakeTurns,
            prerequisiteSkills, 
            communicationSkills, 
            languageSkills,      
            speechSkills,        
            oralMotorAssessment, 
        });
        res.status(201).json(newAssessment);
    } catch (error) {
        console.error('Error creating assessment:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Registration number already exists. Please use a unique number.' });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};




const updateAssessment = async (req, res) => {
    try {
        const updatedAssessment = await TherapyAssessment.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true } 
        );
        if (!updatedAssessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }
        res.status(200).json(updatedAssessment);
    } catch (error) {
        console.error('Error updating assessment:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Registration number already exists. Please use a unique number.' });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};




const deleteAssessment = async (req, res) => {
    try {
        const assessment = await TherapyAssessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        await TherapyAssessment.deleteOne({ _id: req.params.id }); 
        res.status(200).json({ message: 'Assessment removed' });
    } catch (error) {
        console.error('Error deleting assessment:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAssessments,
    getAssessmentById,
    createAssessment,
    updateAssessment,
    deleteAssessment,
};
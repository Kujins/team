// backend/models/MedicalAssessment.js

const mongoose = require('mongoose');

const medicalAssessmentSchema = mongoose.Schema(
    {
        patientRegNo: {
            type: String,
            required: [true, 'Please add patient registration number'],
            //unique: true,
        },
        assessmentDate: {
            type: Date,
            required: [true, 'Please add assessment date'],
            default: Date.now,
        },
        assessedBy: {
            type: String,
            required: [true, 'Please add assessor name'],
        },
        purposeOfAssessment: {
            type: String,
            required: [true, 'Please add purpose of assessment'],
        },
        presentComplaint: {
            type: String,
            required: [true, 'Please add present complaint'],
        },

        // Medical History (from Image 4, but placed here for logical flow in schema)
        gestationalHistory: {
            type: String,
        },
        birthHistory: {
            type: String,
        },
        postNatalHistory: {
            type: String,
        },
        immunizationHistory: {
            type: String,
        },
        developmentalHistory: {
            type: String,
        },
        familyHistoryMedical: { // Renamed to avoid clash with familyHistory in TherapyAssessment
            type: String,
        },
        socialHistory: {
            type: String,
        },
        currentMedication: {
            type: String,
        },
        previousInterventions: {
            type: String,
        },
        feedingHistory: {
            type: String,
        },

        // Physical Assessment (from Image 2)
        headControl: {
            type: String, // 'Normal', 'Partial', 'Poor'
        },
        sitting: {
            type: String, // 'Normal', 'Supported', 'Independent'
        },
        standing: {
            type: String, // 'Normal', 'Supported', 'Independent'
        },
        walking: {
            type: String, // 'Normal', 'Supported', 'Independent'
        },
        visionAssessment: { // Renamed from 'Vision' to avoid clash with TherapyAssessment
            type: String, // 'Normal', 'Poor', 'Blind'
        },
        hearingAssessment: { // Renamed from 'Hearing' to avoid clash with TherapyAssessment
            type: String, // 'Normal', 'Poor', 'Deaf'
        },
        seizures: {
            type: String, // 'Yes', 'No', 'Controlled', 'Uncontrolled'
        },
        oralMotorIssues: { // From Image 2 "Oral Motor"
            type: String, // 'Yes', 'No', or details
        },
        // For "Abnormal Movements"
        abnormalMovements: {
            type: Boolean,
            default: false,
        },
        abnormalMovementsDetails: {
            type: String,
        },

        // Daily Activities (from Image 3)
        dressing: {
            type: String, // 'Independent', 'Assisted', 'Dependent'
        },
        feeding: {
            type: String, // 'Independent', 'Assisted', 'Dependent'
        },
        toileting: {
            type: String, // 'Independent', 'Assisted', 'Dependent'
        },
        grooming: {
            type: String, // 'Independent', 'Assisted', 'Dependent'
        },
        bathing: {
            type: String, // 'Independent', 'Assisted', 'Dependent'
        },
        socialInteraction: {
            type: String, // 'Normal', 'Poor', 'Avoids'
        },
        playActivity: {
            type: String, // 'Solitary', 'Parallel', 'Cooperative'
        },
        leisureActivity: {
            type: String, // Description
        },
        sleepPattern: {
            type: String, // 'Normal', 'Disturbed', 'Irregular'
        },
        eatingPattern: {
            type: String, // 'Normal', 'Picky', 'Overeats', 'Under-eats'
        },
        behavioralIssues: {
            type: Boolean,
            default: false,
        },
        behavioralIssuesDetails: {
            type: String, // 'Tantrums', 'Aggression', 'Self-injury', 'Stereotypic'
        },
        otherConcerns: {
            type: String,
        },

        // From Image 1, "Therapy Needs"
        physiotherapy: {
            type: Boolean,
            default: false,
        },
        speechAndLanguageTherapy: {
            type: Boolean,
            default: false,
        },
        occupationalTherapy: {
            type: Boolean,
            default: false,
        },
        psychologicalCounseling: {
            type: Boolean,
            default: false,
        },
        specialEducation: {
            type: Boolean,
            default: false,
        },
        otherTherapyNeeds: {
            type: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

module.exports = mongoose.model('MedicalAssessment', medicalAssessmentSchema);
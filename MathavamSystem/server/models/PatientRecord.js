// D:\Computer Science - University of Jaffna\3rd Year\Group Project\Mathavam Project\server\models\PatientRecord.js

const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
    // Part 1: Patient Information
    childNo: {
        type: String,
        required: [true, 'Child No is required'],
        unique: true, // Assuming childNo should be unique for each patient
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Patient Name is required'],
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    contactNo: {
        type: String,
        trim: true
    },
    gnDiv: {
        type: String,
        trim: true
    },
    referredBy: {
        type: String,
        trim: true
    },
    reasonForReferral: {
        type: String,
        trim: true
    },
    dateOfInitialAssessment: {
        type: Date
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', null], // Allow null if not required
    },
    age: {
        type: Number
    },

    // Part 1: Parent Information
    motherName: { type: String, trim: true },
    motherAge: { type: Number },
    motherQualification: { type: String, trim: true },
    motherOccupation: { type: String, trim: true },
    motherTelephoneNo: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    fatherAge: { type: Number },
    fatherQualification: { type: String, trim: true },
    fatherOccupation: { type: String, trim: true },
    fatherTelephoneNo: { type: String, trim: true },
    diagnosis: { type: String, trim: true }, // General Diagnosis from Part 1

    // Part 2: Family History of Disorders
    familyHistoryOfDisorders: {
        devDisorders: { type: Boolean, default: false },
        asd: { type: Boolean, default: false },
        speechDisorders: { type: Boolean, default: false },
        psychiatricIllness: { type: Boolean, default: false },
        behavioralProblems: { type: Boolean, default: false },
        other: { type: String, trim: true }
    },

    // Part 2: Birth and Perinatal History
    birthHistory: {
        birthWeight: { type: Number },
        typeOfDelivery: { type: String, trim: true },
        mothersHealthDuringPregnancyDelivery: { type: String, trim: true },
        otherComplicationsDuringPregnancyDeliveryAfterDelivery: { type: String, trim: true }
    },

    // Part 2: Review of System
    reviewOfSystem: {
        visionProblem: { type: String, trim: true },
        hearingProblem: { type: String, trim: true },
        gastroIntestinalProblems: { type: String, trim: true },
        growthWeightProblems: {
            height: { type: Number },
            weight: { type: Number }
        },
        neurologicalProblems: { type: String, trim: true },
        anyOtherSpecifyReview: { type: String, trim: true }
    },

    // Part 2: Developmental History
    developmentalHistory: {
        speech: { type: String, trim: true },
        motor: {
            grossMotor: { type: String, trim: true },
            fineMotor: { type: String, trim: true }
        }
    },

    // Part 3: Schooling
    schooling: { type: String, trim: true },

    // Part 3: Autism Diagnosis
    autismDiagnosis: {
        diagnosedBefore: { type: Boolean, default: false },
        ifYesByWhomAndWhere: { type: String, trim: true },
        anyMedicationsGiven: { type: String, trim: true }
    },

    // Part 3: Chief Complaints
    chiefComplaints: { type: String, trim: true },

    // Part 3: Parent's Expectation
    parentsExpectation: { type: String, trim: true },

    // Part 3: Clinical Diagnosis
    clinicalDiagnosis: {
        dsmIv: { type: String, trim: true },
        cars: { type: String, trim: true }
    },

    // Part 3: Associated Conditions
    associatedConditions: { type: String, trim: true },

    // Part 4: Management Plan
    managementPlan: { type: String, trim: true },

    // Part 4: Home Training Recommendations
    homeTrainingRecommendations: { type: String, trim: true },

    // Part 4: Summary
    summary: { type: String, trim: true },
    presentingComplaintsSummary: { type: String, trim: true },

    // Part 4: Assessment Scores / Details
    carsScore: { type: Number },
    vinelandSocialMaturityScale: { type: String, trim: true },

    // Part 4: Plan
    assessmentPlan: {
        byConPsychiatrist: { type: Boolean, default: false },
        byConPediatrician: { type: Boolean, default: false },
        bySpeechTherapist: { type: Boolean, default: false },
        dateForHomeVisit: { type: Date },
        commencementOfTherapy: { type: Date }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
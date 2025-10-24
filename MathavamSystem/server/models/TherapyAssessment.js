const mongoose = require('mongoose');

const therapyAssessmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add patient name'],
            trim: true // Trim whitespace
        },
        dob: {
            type: Date,
            required: [true, 'Please add date of birth'],
        },
        age: {
            type: String, // Storing age as a string (e.g., "5 years, 3 months")
            required: [true, 'Please add age'],
            trim: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'Please select gender'],
        },
        regNo: {
            type: String,
            unique: true, // Ensure registration number is unique
            required: [true, 'Please add registration number'],
            trim: true,
            // You might want to add a regex validation here for specific formats if needed
        },
        languageUsed: {
            type: String,
            required: [true, 'Please add language used'],
            trim: true
        },
        primaryCarer: {
            type: String,
            required: [true, 'Please add primary carer'],
            trim: true
        },
        medicalDiagnosis: {
            type: String,
            trim: true
        },
        communicationDiagnosis: {
            type: String,
            trim: true
        },
        familyHistory: {
            type: String,
            trim: true
        },
        hearing: {
            type: String,
            trim: true
        },
        vision: {
            type: String,
            trim: true
        },
        siblings: {
            type: String, // Can be number or string (e.g., "2 siblings" or "None")
            trim: true
        },
        motorDevelopment: {
            type: Boolean,
            default: false,
        },
        speechRegression: {
            type: Boolean,
            default: false,
        },
        assessmentDate: {
            type: Date,
            default: Date.now, // Default to current date if not provided
        },
        accessBy: {
            type: String,
            trim: true
        },
        nameResponding: {
            type: String,
            enum: ['always', 'sometimes', 'never', 'N/A'], // Added 'sometimes' and 'N/A' for flexibility
            default: 'N/A'
        },
        canWaitTurn: {
            type: Boolean,
            default: false,
        },
        canTakeTurns: {
            type: Boolean,
            default: false,
        },

        // --- Prerequisite Skills (from PreRequisiteSkill.jsx & OralmotorAssessment.jsx) ---
        prerequisiteSkills: {
            jointAttentionResponding: {
                yes: { type: Boolean, default: false },
                no: { type: Boolean, default: false },
            },
            jointAttentionInitiation: {
                yes: { type: Boolean, default: false },
                no: { type: Boolean, default: false },
            },
            eyeFixation: {
                yes: { type: Boolean, default: false },
                no: { type: Boolean, default: false },
            },
            visualTracking: {
                yes: { type: Boolean, default: false },
                no: { type: Boolean, default: false },
            },
            attentionSpan: {
                extremeDistraction: { type: Boolean, default: false },
                singleChannel: { type: Boolean, default: false },
            },
            turnTaking: {
                waiting: { type: Boolean, default: false },
                takingTurn: { type: Boolean, default: false },
            },
            nameResponding: { // Note: This is nested within prerequisiteSkills, separate from top-level nameResponding
                always: { type: Boolean, default: false },
                never: { type: Boolean, default: false },
            },
            // Fields from OralmotorAssessment.jsx that belong here:
            socialSmile: { type: Boolean, default: false },
            peerRelationship: { type: Boolean, default: false },
            strangerRelationship: { type: Boolean, default: false },
            socialQuestioning: { type: Boolean, default: false },
        },

        // --- Communication Skills (from Communication.jsx) ---
        communicationSkills: {
            communicationStages: {
                ownAgendaStage: { type: Boolean, default: false },
                requesterStage: { type: Boolean, default: false },
                earlyCommunicatorStage: { type: Boolean, default: false },
                partnerStage: { type: Boolean, default: false },
            },
            communicationFunctions: {
                requestingAssistance: {
                    yes: { type: Boolean, default: false },
                    no: { type: Boolean, default: false },
                    verbal: { type: Boolean, default: false },
                    nonVerbal: { type: Boolean, default: false },
                },
                greeting: {
                    yes: { type: Boolean, default: false },
                    no: { type: Boolean, default: false },
                    verbal: { type: Boolean, default: false },
                    nonVerbal: { type: Boolean, default: false },
                },
                agreeing: {
                    yes: { type: Boolean, default: false },
                    no: { type: Boolean, default: false },
                    verbal: { type: Boolean, default: false },
                    nonVerbal: { type: Boolean, default: false },
                },
                disagreeing: {
                    yes: { type: Boolean, default: false },
                    no: { type: Boolean, default: false },
                    verbal: { type: Boolean, default: false },
                    nonVerbal: { type: Boolean, default: false },
                },
            },
        },

        // --- Language Skills (from Language.jsx & OralmotorAssessment.jsx) ---
        languageSkills: {
            comprehension: {
                gesturalCommand: { type: String, enum: ['yes', 'no', 'N/A'], default: 'N/A' },
                verbalComprehensionSingle: { type: Boolean, default: false },
                verbalComprehensionTwo: { type: Boolean, default: false },
                verbalComprehensionThree: { type: Boolean, default: false },
                verbalComprehensionSentences: { type: Boolean, default: false },
                verbalComprehensionPicture: { type: Boolean, default: false },
                verbalComprehensionSequencing: { type: Boolean, default: false },
                verbalComprehensionStory: { type: Boolean, default: false },
            },
            expression: {
                useGesture: { type: String, enum: ['yes', 'no', 'N/A'], default: 'N/A' },
                verbalExpressionSingle: { type: Boolean, default: false },
                verbalExpressionTwo: { type: Boolean, default: false },
                verbalExpressionThree: { type: Boolean, default: false },
                verbalExpressionSentences: { type: Boolean, default: false },
                verbalExpressionPicture: { type: Boolean, default: false },
                verbalExpressionSequencing: { type: Boolean, default: false },
                verbalExpressionStory: { type: Boolean, default: false },
                verbalExpressionAnswer: { type: Boolean, default: false },
            },
            vocabulary: {
                familyMembersCom: { type: Boolean, default: false }, familyMembersExp: { type: Boolean, default: false },
                bodyPartsCom: { type: Boolean, default: false }, bodyPartsExp: { type: Boolean, default: false },
                householdItemsCom: { type: Boolean, default: false }, householdItemsExp: { type: Boolean, default: false },
                fruitsCom: { type: Boolean, default: false }, fruitsExp: { type: Boolean, default: false },
                vegetablesCom: { type: Boolean, default: false }, vegetablesExp: { type: Boolean, default: false },
                animalsCom: { type: Boolean, default: false }, animalsExp: { type: Boolean, default: false },
                birdsCom: { type: Boolean, default: false }, birdsExp: { type: Boolean, default: false },
                vehiclesCom: { type: Boolean, default: false }, vehiclesExp: { type: Boolean, default: false },
                placesCom: { type: Boolean, default: false }, placesExp: { type: Boolean, default: false },
                verbsCom: { type: Boolean, default: false }, verbsExp: { type: Boolean, default: false },
            },
            // Fields from OralmotorAssessment.jsx that belong here:
            higherLanguageFunction: {
                orientation: { type: Boolean, default: false },
                problemSolving: { type: Boolean, default: false },
                reasoning: { type: Boolean, default: false },
                organization: { type: Boolean, default: false },
            },
            playSkills: {
                objectPermanent: { type: Boolean, default: false },
                solitaryPlay: { type: Boolean, default: false },
                constructivePlay: { type: Boolean, default: false },
                functionalPlay: { type: Boolean, default: false },
                pretendPlay: { type: Boolean, default: false },
                symbolicPlay: { type: Boolean, default: false },
            },
            // Cognitive skills (assuming these are part of language or separate if needed)
            cognitiveSkills: { // This block was in your previous schema, but not explicitly collected in forms. Keeping it with defaults.
                matching: { type: Boolean, default: false },
                size: { type: Boolean, default: false },
                number: { type: Boolean, default: false },
                letters: { type: Boolean, default: false },
                shapes: { type: Boolean, default: false },
            },
        },

        // --- Speech Skills (from Speech.jsx) ---
        speechSkills: {
            primaryCarer: { type: String, trim: true }, // This seems to be duplicated with top-level primaryCarer, review your schema
            otherFamily: { type: String, trim: true },
            strangers: { type: String, trim: true },
            intelligibility: { type: String, trim: true },
            fluency: { type: String, trim: true },
            articulation: { type: String, trim: true },
            phonology: { type: String, trim: true },
        },

        // --- Oral Motor Assessment (from OralmotorAssessment.jsx) ---
        oralMotorAssessment: {
            oralSensory: { type: String, enum: ['Hyposensitive', 'Hypersensitive', 'N/A'], default: 'N/A' },
            drooling: { type: String, enum: ['presence', 'absence', 'N/A'], default: 'N/A' },
            lipsStrength: { type: String, enum: ['normal', 'poor', 'N/A'], default: 'N/A' },
            tongueStrength: { type: String, enum: ['normal', 'poor', 'N/A'], default: 'N/A' },
            mobilityLips: { type: String, enum: ['normal', 'poor', 'N/A'], default: 'N/A' },
            mobilityTongue: { type: String, enum: ['normal', 'poor', 'N/A'], default: 'N/A' },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('TherapyAssessment', therapyAssessmentSchema);
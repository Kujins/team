const mongoose = require("mongoose");

const SnapFormSchema = new mongoose.Schema({
  // Define studentInfo as a nested object
  studentInfo: {
    // Frontend sends 'id' for patient ID, so mapping it here
    id: {
      type: String,
      required: true,
      unique: true, // Ensures each student ID is unique across all forms
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number, // Changed to Number as age is typically a numerical value
      required: true,
    },
    class: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Ensures gender is one of these specific values
      required: true
    },
    completedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  answers: {
    type: Map, // Using Map to store key-value pairs (questionIndex: answerValue)
    of: Number, // Values in the map are numbers
    required: true
  },
  totalScore: {
    type: Number,
    // You might want to make this required too, depending on your logic
    // required: true
  },
}, { timestamps: true }); // `timestamps: true` automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model("SnapForm", SnapFormSchema);
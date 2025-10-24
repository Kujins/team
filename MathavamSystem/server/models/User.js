const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true, // Assuming ID numbers should be unique
    trim: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['Super Admin', 'Admin', 'Doctor', 'Therapist', 'Resource Person', 'Parent'], // Ensure valid user types
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Usernames should be unique
    trim: true,
    lowercase: true, // Store usernames in lowercase for consistency
  },
  password: {
    type: String,
    required: true,
  },
  childRegNo: { // Add this field for 'Parent' user type
    type: String,
    required: function() {
      return this.userType === 'Parent'; // Required only if userType is 'Parent'
    },
    trim: true,
    default: null // Set default to null if not a 'Parent'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Mongoose `timestamps` option automatically adds createdAt and updatedAt


const User = mongoose.model('User', userSchema);

module.exports = User;
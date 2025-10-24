const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { 
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    default: 'General Practice',
  },
  contactEmail: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);


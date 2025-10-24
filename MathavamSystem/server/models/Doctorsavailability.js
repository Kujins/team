const mongoose = require('mongoose');

const availabilitySlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  time: { 
    type: String, 
    required: true,
  },
}, { _id: false });

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
    unique: true, 
    ref: 'Doctor', 
  },
  
  weekly: [availabilitySlotSchema], 
  
}, { timestamps: true });

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);


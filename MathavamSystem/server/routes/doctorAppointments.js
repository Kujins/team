const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Get all doctors (userType: "Doctor")
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await User.find({ userType: 'Doctor' }).select('firstName lastName _id');
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Book a new appointment
router.post('/book', async (req, res) => {
    const { patientName, patientPhone, patientEmail, doctorId, appointmentDate, appointmentTime, notes } = req.body;

    if (!patientName || !patientPhone || !doctorId || !appointmentDate || !appointmentTime) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    try {
        // Check if doctor exists
        const doctorExists = await User.findById(doctorId);
        if (!doctorExists || doctorExists.userType !== 'Doctor') {
            return res.status(404).json({ message: 'Selected doctor not found or is not a doctor.' });
        }

        const newAppointment = new Appointment({
            patientName,
            patientPhone,
            patientEmail,
            doctor: doctorId,
            appointmentDate: new Date(appointmentDate), // Ensure it's a Date object
            appointmentTime,
            notes
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all appointments (for admin/staff or specific doctor)
// You might need to add authentication/authorization middleware here
router.get('/', async (req, res) => {
    try {
        // Populate 'doctor' field to get doctor's name
        const appointments = await Appointment.find().populate('doctor', 'firstName lastName');
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get appointments for a specific doctor (e.g., using doctor's ID from token)
router.get('/doctor/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const appointments = await Appointment.find({ doctor: doctorId }).populate('doctor', 'firstName lastName');
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching doctor\'s appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update appointment status (e.g., Confirmed, Cancelled)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true, runValidators: true } // new: true returns the updated doc
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment updated successfully!', appointment: updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
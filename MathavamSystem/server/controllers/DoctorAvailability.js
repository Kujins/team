const Doctor = require('../models/Doctor'); 
const DoctorAvailability = require('../models/DoctorAvailability');

const getDoctorAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findOne({ doctorId: id }, 'name');
        if (!doctor) {
            return res.status(404).json({ message: `Doctor with ID ${id} not found.` });
        }
        const doctorName = doctor.name;

        const availabilityDoc = await DoctorAvailability.findOne({ doctorId: id });
        
        if (!availabilityDoc) {
            return res.status(200).json({ 
                doctorId: id, 
                doctorName: doctorName, // Include the fetched name
                weekly: [], 
                special: [] 
            });
        }
        
        res.status(200).json({
            doctorId: id,
            doctorName: doctorName, // Include the fetched name
            weekly: availabilityDoc.weekly,
            special: availabilityDoc.special,
        });
    } catch (error) {
        console.error("Error fetching doctor availability:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateWeeklyAvailability = async (req, res) => {
    try {
        const { id } = req.params; 
        const { weekly } = req.body; // The complete updated weekly array from the frontend

        const availability = await DoctorAvailability.findOneAndUpdate(
            { doctorId: id },
            { $set: { weekly: weekly } }, // Replace the entire weekly array
            { new: true, upsert: true, runValidators: true } // Return the new doc, create if non-existent
        );

        res.status(200).json({ 
            message: 'Weekly availability updated successfully!', 
            doctorId: id,
            availability: availability.weekly 
        });
    } catch (error) {
        console.error("Error updating doctor availability:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDoctorAvailability,
    updateWeeklyAvailability,
};
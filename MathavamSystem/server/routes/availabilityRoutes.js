const express = require('express');
const { getDoctorAvailability, updateWeeklyAvailability } = require('../controllers/availabilityController');

const router = express.Router();

router.get('/:id', getDoctorAvailability);
router.put('/:id', updateWeeklyAvailability);

module.exports = router;
// CarsformRoutes.js
const express = require('express'); // Change: use require
const {
  submitForm,
  getAllEntries,
  getChildByChildNo,
  deleteEntry,
  updateEntry,
  getEntryById,
} = require('../controllers/carsformController'); // Change: use require and remove .js extension if not needed

const router = express.Router();

router.post('/submit', submitForm);
router.get('/entries', getAllEntries);
router.get('/child/:childNo', getChildByChildNo);
router.delete('/:id', deleteEntry);
router.put('/entries/:id', updateEntry);
router.get('/entries/:id', getEntryById);

module.exports = router; // Change: use module.exports
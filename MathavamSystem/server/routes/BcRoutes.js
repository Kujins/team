// BcRoutes.js
const express = require('express'); // Change: use require
const {
  submitChecklist,
  getAllEntries,
  deleteEntry,
  updateEntry,
  getEntryById,
} = require('../controllers/bcController'); // Change: use require and remove .js extension if not needed

const router = express.Router();

router.post('/submit', submitChecklist);
router.get('/', getAllEntries);
router.delete('/:id', deleteEntry);
router.put('/entries/:id', updateEntry);
router.get('/entries/:id', getEntryById);

module.exports = router; // Change: use module.exports
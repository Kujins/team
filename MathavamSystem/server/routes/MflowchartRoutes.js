// MflowchartRoutes.js
const express = require('express'); // Change: use require
const {
  submitMFlowchart,
  getMFlowchart,
  deleteEntry,
  updateEntry,
  getEntryById,
} = require('../controllers/mflowchartController'); // Change: use require and remove .js extension if not needed

const router = express.Router();

router.post("/submit", submitMFlowchart);
router.get("/", getMFlowchart);
router.delete('/:id', deleteEntry);
router.put('/entries/:id', updateEntry);
router.get('/entries/:id', getEntryById);

module.exports = router; // Change: use module.exports
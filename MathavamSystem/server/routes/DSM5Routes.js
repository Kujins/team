// src/routes/dsmFormRoutes.js
const express = require('express');
const router = express.Router();
const DSM5formController = require('../controllers/DSM5Controller'); // Import the controller

router.get('/', DSM5formController.getAllForms);
router.get('/:id', DSM5formController.getFormById);
router.post('/', DSM5formController.createForm);
router.put('/:id', DSM5formController.updateForm);
router.delete('/:id', DSM5formController.deleteForm);

module.exports = router;
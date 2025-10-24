// ChildRoutes.js
const express = require('express'); // Change: use require
const {
  getAllChildren,
  getChildByChildNo,
  createChild,
  updateChild,
  deleteChild
} = require('../controllers/childController'); // Change: use require and remove .js extension if not needed

const router = express.Router();

router.get('/', getAllChildren);
router.get('/:childNo', getChildByChildNo);
router.post('/', createChild);
router.put('/:childNo', updateChild);
router.delete('/:childNo', deleteChild);

module.exports = router; // Change: use module.exports
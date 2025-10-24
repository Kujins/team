const express = require("express");
const router = express.Router();
const {
  createForm,
  getForms,
  getFormById,
  deleteForm,
  updateForm
} = require("../controllers/SnapController");

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.delete("/:id", deleteForm);
router.put("/:id", updateForm);

module.exports = router;

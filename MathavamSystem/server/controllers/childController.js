import Child from '../models/Child.js';

// @desc Get all children
export const getAllChildren = async (req, res) => {
  try {
    const children = await Child.find();
    res.json(children);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch children', error: err.message });
  }
};

// @desc Get a child by childNo
export const getChildByChildNo = async (req, res) => {
  try {
    const child = await Child.findOne({ childNo: req.params.childNo });
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.json(child);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch child', error: err.message });
  }
};

// @desc Create a new child
export const createChild = async (req, res) => {
  console.log("Received POST /api/child with body:", req.body);  // Add this line
  try {
    const { childNo, name, age, gender, date } = req.body;

    // ...rest of your code

    const newChild = new Child(req.body);
    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create child', error: err.message });
  }
};

// @desc Update child by childNo
export const updateChild = async (req, res) => {
  try {
    const updatedChild = await Child.findOneAndUpdate(
      { childNo: req.params.childNo },
      req.body,
      { new: true }
    );
    if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
    res.json(updatedChild);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update child', error: err.message });
  }
};

// @desc Delete child by childNo
export const deleteChild = async (req, res) => {
  try {
    const deletedChild = await Child.findOneAndDelete({ childNo: req.params.childNo });
    if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
    res.json({ message: 'Child deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete child', error: err.message });
  }
};

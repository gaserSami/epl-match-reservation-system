const express = require('express');
const router = express.Router();
const Linesman = require('../models/Linesman'); // Adjust the path as necessary
const Joi = require('joi');

// Validation schema for Linesman
const linesmanValidationSchema = Joi.object({
  Name: Joi.string().required()
});

// Get all Linesmen
router.get('/', async (req, res) => {
  try {
    const linesmen = await Linesman.find({});
    res.json(linesmen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single linesman by id
router.get('/:id', async (req, res) => {
  try {
    const linesman = await Linesman.findById(req.params.id);
    if (!linesman) return res.status(404).send('Linesman not found.');
    res.send(linesman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Linesman
router.post('/', async (req, res) => {
  try {
    const { error } = linesmanValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newLinesman = new Linesman(req.body);
    const savedLinesman = await newLinesman.save();
    res.status(201).json(savedLinesman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a linesman by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = linesmanValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedLinesman = await Linesman.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLinesman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
});

// Delete a Linesman
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Linesman.findByIdAndDelete(id);
    res.json({ message: 'Linesman deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

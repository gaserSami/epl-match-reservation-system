const express = require('express');
const router = express.Router();
const Referee = require('../models/Referee'); // Adjust the path as necessary
const Joi = require('joi');

// Validation schema for Referee
const refereeValidationSchema = Joi.object({
  Name: Joi.string().required()
});

// Get all Referees
router.get('/', async (req, res) => {
  try {
    const referees = await Referee.find({});
    res.json(referees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single referee by id
router.get('/:id', async (req, res) => {
  try {
    const referee = await Referee.findById(req.params.id);
    if (!referee) return res.status(404).send('Referee not found.');
    res.send(referee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Referee
router.post('/', async (req, res) => {
  try {
    const { error } = refereeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newReferee = new Referee(req.body);
    const savedReferee = await newReferee.save();
    res.status(201).json(savedReferee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a referee by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const referee = await Referee.findById(id);
    if (!referee) return res.status(404).send('Referee not found.');

    const { error } = refereeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedReferee = await Referee.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedReferee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Referee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const referee = await Referee.findById(id);
    if (!referee) return res.status(404).send('Referee not found.');

    await Referee.findByIdAndDelete(id);
    res.json({ message: 'Referee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

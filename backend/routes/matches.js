const express = require('express');
const router = express.Router();
const Match = require('../models/Match'); // Adjust the path as necessary
const Joi = require('joi');

// Validation schema for Match
const matchValidationSchema = Joi.object({
  HomeTeam: Joi.string().required(),
  AwayTeam: Joi.string().required(),
  MatchDate: Joi.date().required(),
  MatchTime: Joi.string().required(),
  StadiumID: Joi.string().required(),
  MainReferee: Joi.string().required(),
  Lineman1: Joi.string().required(),
  Lineman2: Joi.string().required(),
  Price: Joi.number().required(),
});

// Get all Matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find({});
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single match by id
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).send('Match not found.');
    res.send(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Match
router.post('/', async (req, res) => {
  try {
    const { error } = matchValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newMatch = new Match(req.body);
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a match by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = matchValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedMatch = await Match.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Match
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Match.findByIdAndDelete(id);
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

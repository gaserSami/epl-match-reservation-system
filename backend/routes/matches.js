const express = require('express');
const router = express.Router();
const Match = require('../models/Match'); // Adjust the path as necessary
const Joi = require('joi');

// Joi ObjectId validation extension
const JoiObjectId = require('joi-objectid')(Joi);

// Validation schema for Match
const matchValidationSchema = Joi.object({
  HomeTeamID: JoiObjectId().required(),
  AwayTeamID: JoiObjectId().required(),
  MatchDate: Joi.date().required(),
  MatchTime: Joi.string().required(),
  StadiumID: JoiObjectId().required(),
  MainRefereeID: JoiObjectId().required(),
  Lineman1ID: JoiObjectId().required(),
  Lineman2ID: JoiObjectId().required(),
  Price: Joi.number().min(0) // Assuming Price should be greater than or equal to 0
});

// Get all Matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate('HomeTeamID')
      .populate('AwayTeamID')
      .populate('StadiumID')
      .populate('MainRefereeID')
      .populate('Lineman1ID')
      .populate('Lineman2ID');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single match by id
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('HomeTeamID')
      .populate('AwayTeamID')
      .populate('StadiumID')
      .populate('MainRefereeID')
      .populate('Lineman1ID')
      .populate('Lineman2ID');
    if (!match) return res.status(404).send('Match not found.');
    res.send(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create multiple Matches
router.post('/bulk', async (req, res) => {
  try {
    const { error } = Joi.array().items(matchValidationSchema).validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const matches = req.body.map(match => ({
      ...match,
      Price: match.Price || 0 // Use the provided Price or default to 0
    }));

    const savedMatches = await Match.insertMany(matches);
    res.status(201).json(savedMatches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Create a Match
router.post('/', async (req, res) => {
  try {
    const { error } = matchValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newMatch = new Match({
      ...req.body,
      Price: req.body.Price || 0 // Use the provided Price or default to 0
    });
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

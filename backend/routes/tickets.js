const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket'); // Adjust the path as necessary
const Joi = require('joi');
const mongoose = require('mongoose');

// Joi ObjectId validation extension
const JoiObjectId = Joi.extend(require('joi-objectid')(Joi));

// Validation schema for Ticket
const ticketValidationSchema = Joi.object({
  MatchID: JoiObjectId().objectId().required(), // Validate MatchID as an ObjectId
  UserID: JoiObjectId().objectId().required(), // Validate UserID as an ObjectId
  SeatsNumber: Joi.array().items(Joi.number().integer().min(1)).min(1).required(), // Array of seat numbers with at least one element
  Price: Joi.number().min(0).required() // Price should be greater than or equal to 0
});

// Get all Tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate('MatchID', 'HomeTeam AwayTeam MatchDate MatchTime StadiumID')
      .populate('UserID', 'Username');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single ticket by id
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('MatchID', 'HomeTeam AwayTeam MatchDate MatchTime StadiumID')
      .populate('UserID', 'Username');
    if (!ticket) return res.status(404).send('Ticket not found.');
    res.send(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Ticket
router.post('/', async (req, res) => {
  try {
    const validationResult = ticketValidationSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    const newTicket = new Ticket({
      MatchID: mongoose.Types.ObjectId(req.body.MatchID),
      UserID: mongoose.Types.ObjectId(req.body.UserID),
      SeatsNumber: req.body.SeatsNumber,
      Price: req.body.Price
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a ticket by id
router.put('/:id', async (req, res) => {
  try {
    const validationResult = ticketValidationSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        MatchID: mongoose.Types.ObjectId(req.body.MatchID),
        UserID: mongoose.Types.ObjectId(req.body.UserID),
        SeatsNumber: req.body.SeatsNumber,
        Price: req.body.Price
      },
      { new: true }
    );
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Ticket
router.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

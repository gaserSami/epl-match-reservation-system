const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Joi = require('joi');
const mongoose = require('mongoose');

// Joi ObjectId validation extension
Joi.objectId = require('joi-objectid')(Joi); // Extend Joi to include objectId as a type

// Validation schema for Ticket
const ticketValidationSchema = Joi.object({
  MatchID: Joi.objectId().required(), // Validate MatchID as an ObjectId
  UserID: Joi.objectId().required(), // Validate UserID as an ObjectId
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


// Create multiple Tickets
router.post('/bulk', async (req, res) => {
  try {
    const tickets = req.body;

    // Validate each ticket
    for (let ticket of tickets) {
      const validationResult = ticketValidationSchema.validate(ticket);
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
    }

    // Create each ticket
    const newTickets = tickets.map(ticket => ({
      MatchID: new mongoose.Types.ObjectId(ticket.MatchID),
      UserID: new mongoose.Types.ObjectId(ticket.UserID),
      SeatsNumber: ticket.SeatsNumber,
      Price: ticket.Price
    }));

    // Save all tickets to the database
    const savedTickets = await Ticket.insertMany(newTickets);
    res.status(201).json(savedTickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      MatchID: new mongoose.Types.ObjectId(req.body.MatchID),
      UserID: new mongoose.Types.ObjectId(req.body.UserID),
      SeatsNumber: req.body.SeatsNumber,
      Price: req.body.Price
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a GET route to fetch tickets by matchID as a URL parameter
router.get('/tickets/:matchID', async (req, res) => {
  const matchID = req.params.matchID;

  try {
    const matchObjectId = mongoose.Types.ObjectId(matchID);
    const tickets = await Ticket.find({ 'MatchID._id': matchObjectId });

    if (tickets.length === 0) {
      return res.status(404).send('Ticket not found.');
    }

    res.json(tickets);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).send('Invalid matchID format');
    }
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
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

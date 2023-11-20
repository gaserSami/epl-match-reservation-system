const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket'); // Adjust the path as necessary
const Joi = require('joi');

// Validation schema for Ticket
const ticketValidationSchema = Joi.object({
  MatchID: Joi.string().required(), // Assuming MatchID is a string representation of an ObjectId
  UserID: Joi.string().required(), // Assuming UserID is a string representation of an ObjectId
  SeatsNumber: Joi.array().items(Joi.number().integer().min(1)).required(), // Array of seat numbers
  Price: Joi.number().min(0).required()
});

// Get all Tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find({}).populate('MatchID').populate('UserID');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single ticket by id
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('MatchID').populate('UserID');
    if (!ticket) return res.status(404).send('Ticket not found.');
    res.send(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Ticket
router.post('/', async (req, res) => {
  try {
    const { error } = ticketValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newTicket = new Ticket({
      MatchID: req.body.MatchID,
      UserID: req.body.UserID,
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
    const { id } = req.params;
    const { error } = ticketValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Ticket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

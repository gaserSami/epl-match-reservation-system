const mongoose = require('mongoose');

// Define the Ticket Schema with MatchID as a reference and SeatsNumber as an array
const TicketSchema = new mongoose.Schema({
  MatchID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Match' }, // Reference to Match model
  UserID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User model
  SeatsNumber: [{ type: Number, required: true }], // Array of seat numbers
  Price: { type: Number, required: true }
});

// Create a model from the schema
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;

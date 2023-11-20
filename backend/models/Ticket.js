const mongoose = require('mongoose');

// Define the Ticket Schema according to your collection structure
const TicketSchema = new mongoose.Schema({
  MatchID: { type: String, required: true },
  Username: { type: String, required: true },
  SeatsNumber: { type: Number, required: true },
  Price: { type: Number, required: true },
  Status: { type: String, required: true, enum: ['Booked', 'Available'] }
});

// Create a model from the schema
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;

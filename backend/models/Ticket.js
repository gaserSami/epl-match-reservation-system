/* 
  This file defines the Ticket model in the database.
  The Ticket model is used to store the ticket information:
    MatchID: the ID of the match
    UserID: the ID of the user
    SeatsNumber: the array of seat numbers
    Price: the total price of the ticket
  it requires mongoose and defines the Ticket schema.
  It creates a model from the schema and exports the model. 
*/

// Import required module
const mongoose = require("mongoose"); // MongoDB integration

// Define the Ticket Schema with MatchID as a reference and SeatsNumber as an array
const TicketSchema = new mongoose.Schema({
  MatchID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Match",
  }, // Reference to Match model
  UserID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to User model
  SeatsNumber: {
    type: [{ type: Number, required: true }],
    validate: [arrayLimit, "{PATH} should have at least 1 element"],
  }, // Array of seat numbers
  Price: { type: Number, required: true },
});

// Validate the array of seat numbers
function arrayLimit(val) {
  return val.length > 0;
}

// Create a model from the schema
const Ticket = mongoose.model("Ticket", TicketSchema);

// Export the newly created model
module.exports = Ticket;

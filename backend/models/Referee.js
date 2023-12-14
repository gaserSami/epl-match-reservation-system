/* This file defines the Referee model in the database.
   The Referee model is used to store the name of the referee.
*/

// Import required module
const mongoose = require("mongoose");

// Define the Referee Schema
const RefereeSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
});

// Create a model from the schema
const Referee = mongoose.model("Referee", RefereeSchema);

// Export the newly created model
module.exports = Referee;

/*
  This file contains the Team model.
  It requires mongoose and defines the Team schema.
  The Team schema has one field:
    TeamName: the name of the team
  It creates a model from the schema and exports the model.
*/

// Import required module
const mongoose = require("mongoose"); // MongoDB integration

// Define the Team Schema
const TeamSchema = new mongoose.Schema({
  TeamName: { type: String, required: true, unique: true }, // Name of the team
});

// Create a model from the schema
const Team = mongoose.model("Team", TeamSchema);

// Export the newly created model
module.exports = Team;

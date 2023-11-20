const mongoose = require('mongoose');

// Define the Team Schema
const TeamSchema = new mongoose.Schema({
  TeamName: { type: String, required: true, unique: true }
});

// Create a model from the schema
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;

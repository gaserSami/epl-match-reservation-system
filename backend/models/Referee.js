const mongoose = require('mongoose');

// Define the Referee Schema
const RefereeSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true }
});

// Create a model from the schema
const Referee = mongoose.model('Referee', RefereeSchema);

module.exports = Referee;

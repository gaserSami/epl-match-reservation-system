const mongoose = require('mongoose');

// Define the Linesman Schema
const LinesmanSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true }
});

// Create a model from the schema
const Linesman = mongoose.model('Linesman', LinesmanSchema);

module.exports = Linesman;

const mongoose = require('mongoose');

// Define the Stadium Schema
const StadiumSchema = new mongoose.Schema({
  StadiumName: { type: String, required: true, unique: true },
  Rows: { type: Number, required: true },
  Columns: { type: Number, required: true }
});

// Create a model from the schema
const Stadium = mongoose.model('Stadium', StadiumSchema);

module.exports = Stadium;

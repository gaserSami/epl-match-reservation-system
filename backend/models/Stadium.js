/*
  This file contains the Stadium model.
  It requires mongoose and defines the Stadium schema.
  The Stadium schema has the following fields:
    StadiumName: the name of the stadium
    Rows: the number of rows in the stadium
    Columns: the number of columns in the stadium
  It creates a model from the schema and exports the model.
*/

// Import required module
const mongoose = require("mongoose"); // MongoDB integration

// Define the Stadium Schema
const StadiumSchema = new mongoose.Schema({
  StadiumName: { type: String, required: true, unique: true }, // Name of the stadium
  Rows: { type: Number, required: true }, // Number of rows in the stadium
  Columns: { type: Number, required: true }, // Number of columns in the stadium
});

// Create a model from the schema
const Stadium = mongoose.model("Stadium", StadiumSchema);

// Export the newly created model
module.exports = Stadium;

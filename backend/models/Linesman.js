/* 
 This file defines the Linesman model in the database.
  It requires mongoose and defines the Linesman schema.
  The Linesman schema has one field:
    Name: the name of the linesman 
  It creates a model from the schema and exports the model.
*/

// Import required module
const mongoose = require("mongoose"); // MongoDB integration

// Define the Linesman Schema
const LinesmanSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true }, // Name of the linesman
});

// Create a model from the schema
const Linesman = mongoose.model("Linesman", LinesmanSchema);

// Export the newly created model
module.exports = Linesman;

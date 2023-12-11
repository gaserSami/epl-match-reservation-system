/*
  This is the Match model, which is used to store the information about a match.
  It requires mongoose and defines the Match schema.
  The Match schema has the following fields:
    HomeTeamID: the ID of the home team
    AwayTeamID: the ID of the away team
    MatchDate: the date of the match
    MatchTime: the time of the match
    StadiumID: the ID of the stadium
    MainRefereeID: the ID of the main referee
    Lineman1ID: the ID of the first linesman
    Lineman2ID: the ID of the second linesman
    Price: the price of the ticket
  It creates a model from the schema and exports the model.
*/

// Import required module
const mongoose = require("mongoose"); // MongoDB integration
const Schema = mongoose.Schema; // Mongoose Schema constructor

// Define the Match Schema
const MatchSchema = new Schema({
  HomeTeamID: { type: Schema.Types.ObjectId, ref: "Team", required: true }, // Home team ID
  AwayTeamID: { type: Schema.Types.ObjectId, ref: "Team", required: true }, // Away team ID
  MatchDate: { type: Date, required: true }, // Match date
  MatchTime: { type: String, required: true }, // Match time
  StadiumID: { type: Schema.Types.ObjectId, ref: "Stadium", required: true }, // Stadium ID
  MainRefereeID: {
    type: Schema.Types.ObjectId,
    ref: "Referee",
    required: true,
  }, // Main referee ID
  Lineman1ID: { type: Schema.Types.ObjectId, ref: "Linesman", required: true }, // First linesman ID
  Lineman2ID: { type: Schema.Types.ObjectId, ref: "Linesman", required: true }, // Second linesman ID
  Price: { type: Number, required: true, default: 0 }, // Default price set to 0
});

// Create a model from the schema
const Match = mongoose.model("Match", MatchSchema);

// Export the newly created model
module.exports = Match;

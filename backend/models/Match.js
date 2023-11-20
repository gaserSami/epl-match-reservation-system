const mongoose = require('mongoose');

// Define the Match Schema
const MatchSchema = new mongoose.Schema({
  HomeTeam: { type: String, required: true },
  AwayTeam: { type: String, required: true },
  MatchDate: { type: Date, required: true },
  MatchTime: { type: String, required: true },
  StadiumID: { type: String, required: true },
  MainReferee: { type: String, required: true },
  Lineman1: { type: String, required: true },
  Lineman2: { type: String, required: true },
  Price: { type: Number, required: true, default: 0 } // Default price set to 0
});

// Create a model from the schema
const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;

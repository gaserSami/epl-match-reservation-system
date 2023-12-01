const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Match Schema
const MatchSchema = new Schema({
  HomeTeamID: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  AwayTeamID: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  MatchDate: { type: Date, required: true },
  MatchTime: { type: String, required: true },
  StadiumID: { type: Schema.Types.ObjectId, ref: 'Stadium', required: true },
  MainRefereeID: { type: Schema.Types.ObjectId, ref: 'Referee', required: true },
  Lineman1ID: { type: Schema.Types.ObjectId, ref: 'Linesman', required: true },
  Lineman2ID: { type: Schema.Types.ObjectId, ref: 'Linesman', required: true },
  Price: { type: Number, required: true, default: 0 } // Default price set to 0
});

// Create a model from the schema
const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
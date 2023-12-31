/*
  This file contains the routes for the Match model.
  The routes are mounted at /matches.
  The routes use the Match model and Joi validation.
  The routes are exported for use in server.js.
*/


// requires: express, router, Match model, Joi
const express = require('express');
const router = express.Router();
const Match = require('../models/Match'); // Adjust the path as necessary
const Joi = require('joi');

// Joi ObjectId validation extension
const JoiObjectId = require('joi-objectid')(Joi);

// Validation schema for Match
const matchValidationSchema = Joi.object({
  HomeTeamID: JoiObjectId().required(),
  AwayTeamID: JoiObjectId().required(),
  MatchDate: Joi.date().required(),
  MatchTime: Joi.string().required(),
  StadiumID: JoiObjectId().required(),
  MainRefereeID: JoiObjectId().required(),
  Lineman1ID: JoiObjectId().required(),
  Lineman2ID: JoiObjectId().required(),
  Price: Joi.number().min(0) // Assuming Price should be greater than or equal to 0
});


// checkTeamsFree(newMatch)
async function checkTeamsFree(newMatch) {
// and newMatch.MatchTime is the local time string in 24-hour format (HH:mm)

const matchDate = new Date(newMatch.MatchDate); // This creates a Date object in UTC
const [matchStartTimeHours, matchStartTimeMinutes] = newMatch.MatchTime.split(':').map(Number);
const startTimeInMinutes = matchStartTimeHours * 60 + matchStartTimeMinutes;
const endTimeInMinutes = startTimeInMinutes + 90;

console.log(`Match date: ${matchDate}`);
console.log(`Match start time: ${newMatch.MatchTime}`);
console.log(`Match start time in minutes: ${startTimeInMinutes}`);
console.log(`Match end time in minutes: ${endTimeInMinutes}`);

  // First, find any match that occurs on the same date
  const matchesOnSameDay = await Match.find({
    MatchDate: {
      $gte: new Date(matchDate.setHours(0, 0, 0, 0)),
      $lt: new Date(matchDate.setHours(23, 59, 59, 999))
    }
  });

  console.log(`Matches on same day: ${JSON.stringify(matchesOnSameDay, null, 2)}`);

  // If there are matches on the same day, check for time overlap
  const overlappingMatches = matchesOnSameDay.filter(match => {
    const [existingMatchStartTimeHours, existingMatchStartTimeMinutes] = match.MatchTime.split(':').map(Number);
    const existingStartTimeInMinutes = existingMatchStartTimeHours * 60 + existingMatchStartTimeMinutes;
    const existingEndTimeInMinutes = existingStartTimeInMinutes + 90;

    console.log(`Match start time in minutes: ${existingStartTimeInMinutes}`);
    console.log(`Match end time in minutes: ${existingEndTimeInMinutes}`);

    return (
      (startTimeInMinutes >= existingStartTimeInMinutes && startTimeInMinutes <= existingEndTimeInMinutes) ||
      (endTimeInMinutes >= existingStartTimeInMinutes && endTimeInMinutes <= existingEndTimeInMinutes)
    );
  }
  );

  // If there are overlapping matches, check if the teams are the same
  const isTeamOverlapping = overlappingMatches.some(match => {
    return (
      match.HomeTeamID.equals(newMatch.HomeTeamID) ||
      match.AwayTeamID.equals(newMatch.HomeTeamID) ||
      match.HomeTeamID.equals(newMatch.AwayTeamID) ||
      match.AwayTeamID.equals(newMatch.AwayTeamID)
    );
  });

  console.log(`Overlapping matches: ${JSON.stringify(overlappingMatches, null, 2)}`);
  console.log(`Is team overlapping: ${isTeamOverlapping}`);

  return !isTeamOverlapping;
}


async function checkStadiumFree(newMatch) {
  const matchDate = new Date(newMatch.MatchDate); // This creates a Date object in UTC
const [matchStartTimeHours, matchStartTimeMinutes] = newMatch.MatchTime.split(':').map(Number);
const startTimeInMinutes = matchStartTimeHours * 60 + matchStartTimeMinutes;
const endTimeInMinutes = startTimeInMinutes + 90;

console.log(`Match date: ${matchDate}`);
console.log(`Match start time: ${newMatch.MatchTime}`);
console.log(`Match start time in minutes: ${startTimeInMinutes}`);
console.log(`Match end time in minutes: ${endTimeInMinutes}`);

 // Find matches on the same day in the same stadium
 const matchesOnSameDayAndStadium = await Match.find({
  StadiumID: newMatch.StadiumID,
  MatchDate: {
    $gte: new Date(matchDate.setHours(0, 0, 0, 0)),
    $lt: new Date(matchDate.setHours(23, 59, 59, 999))
  }
});

  console.log(`Matches on same day: ${JSON.stringify(matchesOnSameDayAndStadium, null, 2)}`);

  // If there are matches on the same day, check for time overlap
  const overlappingMatches = matchesOnSameDayAndStadium.filter(match => {
    const [existingMatchStartTimeHours, existingMatchStartTimeMinutes] = match.MatchTime.split(':').map(Number);
    const existingStartTimeInMinutes = existingMatchStartTimeHours * 60 + existingMatchStartTimeMinutes;
    const existingEndTimeInMinutes = existingStartTimeInMinutes + 90;

    console.log(`Match start time in minutes: ${existingStartTimeInMinutes}`);
    console.log(`Match end time in minutes: ${existingEndTimeInMinutes}`);

    return (
      (startTimeInMinutes >= existingStartTimeInMinutes && startTimeInMinutes <= existingEndTimeInMinutes) ||
      (endTimeInMinutes >= existingStartTimeInMinutes && endTimeInMinutes <= existingEndTimeInMinutes)
    );
  }
  );

  return overlappingMatches.length === 0;
}

async function checkRefereeFree(newMatch) {
  const matchDate = new Date(newMatch.MatchDate); // This creates a Date object in UTC
const [matchStartTimeHours, matchStartTimeMinutes] = newMatch.MatchTime.split(':').map(Number);
const startTimeInMinutes = matchStartTimeHours * 60 + matchStartTimeMinutes;
const endTimeInMinutes = startTimeInMinutes + 90;

console.log(`Match date: ${matchDate}`);
console.log(`Match start time: ${newMatch.MatchTime}`);
console.log(`Match start time in minutes: ${startTimeInMinutes}`);
console.log(`Match end time in minutes: ${endTimeInMinutes}`);

 // Find matches on the same day in the same stadium
 const matchesOnSameDayAndReferee = await Match.find({
  MainRefereeID: newMatch.MainRefereeID,
  MatchDate: {
    $gte: new Date(matchDate.setHours(0, 0, 0, 0)),
    $lt: new Date(matchDate.setHours(23, 59, 59, 999))
  }
});

  console.log(`Matches on same day: ${JSON.stringify(matchesOnSameDayAndReferee, null, 2)}`);

  // If there are matches on the same day, check for time overlap
  const overlappingMatches = matchesOnSameDayAndReferee.filter(match => {
    const [existingMatchStartTimeHours, existingMatchStartTimeMinutes] = match.MatchTime.split(':').map(Number);
    const existingStartTimeInMinutes = existingMatchStartTimeHours * 60 + existingMatchStartTimeMinutes;
    const existingEndTimeInMinutes = existingStartTimeInMinutes + 90;

    console.log(`Match start time in minutes: ${existingStartTimeInMinutes}`);
    console.log(`Match end time in minutes: ${existingEndTimeInMinutes}`);

    return (
      (startTimeInMinutes >= existingStartTimeInMinutes && startTimeInMinutes <= existingEndTimeInMinutes) ||
      (endTimeInMinutes >= existingStartTimeInMinutes && endTimeInMinutes <= existingEndTimeInMinutes)
    );
  }
  );

  return overlappingMatches.length === 0;
}

async function checkLinesmenFree(newMatch) {

  const matchDate = new Date(newMatch.MatchDate); // This creates a Date object in UTC
const [matchStartTimeHours, matchStartTimeMinutes] = newMatch.MatchTime.split(':').map(Number);
const startTimeInMinutes = matchStartTimeHours * 60 + matchStartTimeMinutes;
const endTimeInMinutes = startTimeInMinutes + 90;

console.log(`Match date: ${matchDate}`);
console.log(`Match start time: ${newMatch.MatchTime}`);
console.log(`Match start time in minutes: ${startTimeInMinutes}`);
console.log(`Match end time in minutes: ${endTimeInMinutes}`);

  // First, find any match that occurs on the same date
  const matchesOnSameDay = await Match.find({
    MatchDate: {
      $gte: new Date(matchDate.setHours(0, 0, 0, 0)),
      $lt: new Date(matchDate.setHours(23, 59, 59, 999))
    }
  });

  console.log(`Matches on same day: ${JSON.stringify(matchesOnSameDay, null, 2)}`);

  // If there are matches on the same day, check for time overlap
  const overlappingMatches = matchesOnSameDay.filter(match => {
    const [existingMatchStartTimeHours, existingMatchStartTimeMinutes] = match.MatchTime.split(':').map(Number);
    const existingStartTimeInMinutes = existingMatchStartTimeHours * 60 + existingMatchStartTimeMinutes;
    const existingEndTimeInMinutes = existingStartTimeInMinutes + 90;

    console.log(`Match start time in minutes: ${existingStartTimeInMinutes}`);
    console.log(`Match end time in minutes: ${existingEndTimeInMinutes}`);

    return (
      (startTimeInMinutes >= existingStartTimeInMinutes && startTimeInMinutes <= existingEndTimeInMinutes) ||
      (endTimeInMinutes >= existingStartTimeInMinutes && endTimeInMinutes <= existingEndTimeInMinutes)
    );
  }
  );

  // If there are overlapping matches, check if the teams are the same
  const isTeamOverlapping = overlappingMatches.some(match => {
    return (
      match.Lineman1ID.equals(newMatch.Lineman1ID) ||
      match.Lineman2ID.equals(newMatch.Lineman1ID) ||
      match.Lineman1ID.equals(newMatch.Lineman2ID) ||
      match.Lineman2ID.equals(newMatch.Lineman2ID)
    );
  });

  console.log(`Overlapping matches: ${JSON.stringify(overlappingMatches, null, 2)}`);
  console.log(`Is team overlapping: ${isTeamOverlapping}`);

  return !isTeamOverlapping;
}


// Get all Matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate('HomeTeamID')
      .populate('AwayTeamID')
      .populate('StadiumID')
      .populate('MainRefereeID')
      .populate('Lineman1ID')
      .populate('Lineman2ID');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single match by id
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('HomeTeamID')
      .populate('AwayTeamID')
      .populate('StadiumID')
      .populate('MainRefereeID')
      .populate('Lineman1ID')
      .populate('Lineman2ID');
    if (!match) return res.status(404).send('Match not found.');
    res.send(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create multiple Matches
router.post('/bulk', async (req, res) => {
  try {
    const { error } = Joi.array().items(matchValidationSchema).validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const matches = req.body.map(match => ({
      ...match,
      Price: match.Price || 0 // Use the provided Price or default to 0
    }));

    const savedMatches = await Match.insertMany(matches);
    res.status(201).json(savedMatches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Create a Match
router.post('/', async (req, res) => {
  try {
    const { error } = matchValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if teams are free
    if (!(await checkTeamsFree(req.body))) {
      return res.status(409).json({ message: "One or more teams are not free at the requested time." });
    }

    // Check if stadium is free
    if (!(await checkStadiumFree(req.body))) {
      return res.status(409).json({ message: "Stadium is not free at the requested time." });
    }

    // Check if referee is free
    if (!(await checkRefereeFree(req.body))) {
      return res.status(409).json({ message: "Referee is not free at the requested time." });
    }

    // Check if linesmen are free
    if (!(await checkLinesmenFree(req.body))) {
      return res.status(409).json({ message: "One or both linesmen are not free at the requested time." });
    }

    // If all checks pass, create the match
    const newMatch = new Match({
      ...req.body,
      Price: req.body.Price || 0
    });

    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a match by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = matchValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedMatch = await Match.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Match
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Match.findByIdAndDelete(id);
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;

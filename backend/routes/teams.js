/*
  This file contains the routes for the Team model.
  The routes are mounted at /teams.
  The routes use the Team model and Joi validation.
  The routes are exported for use in server.js.
*/

// requires: express, router, Team model, Joi
const express = require("express");
const router = express.Router();
const Team = require("../models/Team"); // Adjust the path as necessary
const Joi = require("joi");

// Validation schema for Team
const teamValidationSchema = Joi.object({
  TeamName: Joi.string().required(),
});

// Get all Teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single team by id
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).send("Team not found.");
    res.send(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a Team
router.post("/", async (req, res) => {
  try {
    const { error } = teamValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a team by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).send("Team not found.");

    const { error } = teamValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Team
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).send("Team not found.");

    await Team.findByIdAndDelete(id);
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;

/*
  this file contains the routes for the stadiums
  the routes are mounted at /stadiums
  the routes use the stadium model and joi validation
  the routes are exported for use in server.js
*/

// requires: express, router, stadium model, joi
const express = require("express");
const router = express.Router();
const Stadium = require("../models/Stadium"); // Adjust the path as necessary
const Joi = require("joi");

// Validation schema for Stadium
const stadiumValidationSchema = Joi.object({
  StadiumName: Joi.string().required(),
  Rows: Joi.number().integer().min(1).required(),
  Columns: Joi.number().integer().min(1).required(),
});

// Get all Stadiums
router.get("/", async (req, res) => {
  try {
    const stadiums = await Stadium.find({});
    res.json(stadiums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single stadium by id
router.get("/:id", async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).send("Stadium not found.");
    res.send(stadium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create multiple stadiums
router.post("/bulk", async (req, res) => {
  try {
    const stadiums = req.body;
    const validationPromises = stadiums.map((stadium) =>
      stadiumValidationSchema.validateAsync(stadium)
    );
    const validationResults = await Promise.all(validationPromises);
    const validationErrors = validationResults.filter((result) => result.error);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(
        (result) => result.error.details[0].message
      );
      return res.status(400).json({ message: errorMessages });
    }

    const savedStadiums = await Stadium.insertMany(stadiums);
    res.status(201).json(savedStadiums);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Create a Stadium
router.post("/", async (req, res) => {
  try {
    const { error } = stadiumValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newStadium = new Stadium(req.body);
    const savedStadium = await newStadium.save();
    res.status(201).json(savedStadium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a stadium by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stadium = await Stadium.findById(id);
    if (!stadium) return res.status(404).send("Stadium not found.");

    const { error } = stadiumValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedStadium = await Stadium.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStadium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete a Stadium
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stadium = await Stadium.findById(id);
    if (!stadium) return res.status(404).send("Stadium not found.");

    await Stadium.findByIdAndDelete(id);
    res.json({ message: "Stadium deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;

/* 
  This file contains the routes for the Linesman model. 
  The routes are mounted at /linesmen.
  The routes use the Linesman model and Joi validation.
  The routes are exported for use in server.js.
*/


// requires: express, router, Linesman model, Joi
const express = require("express");
const router = express.Router();
const Linesman = require("../models/Linesman"); // Adjust the path as necessary
const Joi = require("joi");

// Validation schema for Linesman
const linesmanValidationSchema = Joi.object({
  Name: Joi.string().required(),
});

// Get all Linesmen
router.get("/", async (req, res) => {
  try {
    const linesmen = await Linesman.find({});
    res.json(linesmen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single linesman by id
router.get("/:id", async (req, res) => {
  try {
    const linesman = await Linesman.findById(req.params.id);
    if (!linesman) return res.status(404).send("Linesman not found.");
    res.send(linesman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create multiple Linesmen
router.post("/bulk", async (req, res) => {
  try {
    const { error } = Joi.array()
      .items(linesmanValidationSchema)
      .validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const linesmen = req.body.map((linesmanData) => new Linesman(linesmanData));
    const savedLinesmen = await Linesman.insertMany(linesmen);
    res.status(201).json(savedLinesmen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a Linesman
router.post("/", async (req, res) => {
  try {
    const { error } = linesmanValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newLinesman = new Linesman(req.body);
    const savedLinesman = await newLinesman.save();
    res.status(201).json(savedLinesman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a linesman by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const linesman = await Linesman.findById(id);
    if (!linesman) return res.status(404).send("Linesman not found.");

    const { error } = linesmanValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedLinesman = await Linesman.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedLinesman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Linesman
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const linesman = await Linesman.findById(id);
    if (!linesman) return res.status(404).send("Linesman not found.");

    await Linesman.findByIdAndDelete(id);
    res.json({ message: "Linesman deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Validation schema for User
const userValidationSchema = Joi.object({
  Username: Joi.string().required(),
  Password: Joi.string().required(),
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  DateOfBirth: Joi.date().required(),
  Gender: Joi.string().required(),
  City: Joi.string().required(),
  Address: Joi.string().required(),
  Email: Joi.string().email().required(),
  UserType: Joi.string().required()
});

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found.');
  res.send(user);
});

// Create a User
router.post('/', async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { Password, ...userData } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = new User({ ...userData, Password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a user by id
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
});


// Delete a User
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
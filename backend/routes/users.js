const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Validation schema for User
const userValidationSchema = Joi.object({
  Username: Joi.string().required(),
  Password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .invalid('password') // Add this line
  .messages({
    'string.pattern.base': 'Password must contain only alphanumeric characters.',
    'any.invalid': '"password" is a reserved word.' // Add this line
  }),
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  DateOfBirth: Joi.date().required(),
  Gender: Joi.string().required(),
  City: Joi.string().required(),
  Address: Joi.string().optional(),
  Email: Joi.string().email().required(),
  UserType: Joi.string().required(),
  State: Joi.string().valid('accepted', 'pending').optional()
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

// Create multiple Users
router.post('/bulk', async (req, res) => {
  try {
    const users = req.body;
    const validationResults = users.map(user => userValidationSchema.validate(user));
    const errors = validationResults.filter(result => result.error);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0].error.details[0].message });
    }

    const saltRounds = 10;
    const usersWithHashedPasswords = await Promise.all(users.map(async user => {
      const { Password, ...userData } = user;
      const hashedPassword = await bcrypt.hash(Password, saltRounds);
      return { ...userData, Password: hashedPassword };
    }));

    const newUsers = await User.insertMany(usersWithHashedPasswords);
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a User
router.post('/', async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      // Send the validation error message in the response
      return res.status(400).json({ message: error.details[0].message });
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
    
    // Check if the password was provided
    let updateData = req.body;
    if (req.body.Password && req.body.Password.trim() !== "password") {
      // If a new password was provided, hash it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
      updateData = { ...req.body, Password: hashedPassword };
    } else {
      // If no new password was provided, remove the password field from the update data
      const { Password, ...rest } = req.body;
      updateData = rest;
    }

    // Update the user with the new data, excluding password if it was not provided
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update the state of a user by id
router.put('/:id/state', async (req, res) => {
  try {
    const { id } = req.params;
    const { State } = req.body;

    // Update the state of the user
    const updatedUser = await User.findByIdAndUpdate(id, { State }, { new: true });
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
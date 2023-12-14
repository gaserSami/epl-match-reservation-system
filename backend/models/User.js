/*
  This file contains the User model.
  It requires mongoose and defines the User schema.
  The User schema has the following fields:
    username: the username of the user
    password: the password of the user
    firstName: the first name of the user
    lastName: the last name of the user
    dateOfBirth: the date of birth of the user
    gender: gender of the user
    city : the city of the user
    address : the address of the user
    email: the email of the user
    userType: the type of the user
    state: the state of the user
  It creates a model from the schema and exports the model.
  */

// Import required module
const mongoose = require('mongoose'); // MongoDB integration

// Define the User Schema according to your collection structure
const UserSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true }, // Username of the user
  Password: { type: String, required: true }, // Password of the user
  FirstName: { type: String, required: true }, // First name of the user
  LastName: { type: String, required: true }, // Last name of the user
  DateOfBirth: { type: Date, required: true }, // Date of birth of the user
  Gender: { type: String, required: true },   // gender of the user
  City: { type: String, required: true },    // city of the user
  Address: { type: String, required: false }, // address of the user
  Email: { type: String, required: true, unique: true }, // Email of the user
  UserType: { type: String, required: true }, // Type of the user
  State: { type: String, required: false, default: 'pending', enum: ['accepted', 'pending'] } // State of the user
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the newly created model
module.exports = User;
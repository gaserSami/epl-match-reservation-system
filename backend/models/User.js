const mongoose = require('mongoose');

// Define the User Schema according to your collection structure
const UserSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  Gender: { type: String, required: true },
  City: { type: String, required: true },
  Address: { type: String, required: false },
  Email: { type: String, required: true, unique: true },
  UserType: { type: String, required: true },
  State: { type: String, required: false, default: 'pending', enum: ['accepted', 'pending'] }
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
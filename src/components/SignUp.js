import React, { useState } from "react";
import axios from 'axios';
import "../styles/SignUp.css";

function SignUp() {
  // Define state variables
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate inputs
    if (!username || !firstName || !lastName || !city || !gender || !email || !birthdate || !password || !address) {
      setError('Please fill in all fields.');
      return;
    }

    // Create new user object
    const newUser = {
      Username: username,
      FirstName: firstName,
      LastName: lastName,
      City: city,
      Gender: gender,
      Email: email,
      DateOfBirth: new Date(birthdate),
      Password: password,
      Address: address,
      UserType: "fan"
    };

    try {
      // Send POST request to create user
      await axios.post('http://localhost:5000/users', newUser);
      alert('User created successfully!');
      // Reset state
      setUsername('');
      setFirstName('');
      setLastName('');
      setCity('');
      setGender('');
      setEmail('');
      setBirthdate('');
      setPassword('');
      setAddress('');
      setError(null);
    } catch (error) {
      setError('Error creating user. Please try again.');
      alert("There was an error" + error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Please enter your details.</p>
        {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="example" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="example" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="example" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select id="city" value={city} onChange={e => setCity(e.target.value)} required>
                <option value="">Select a city</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Giza">Giza</option>
                <option value="Luxor">Luxor</option>
                <option value="Aswan">Aswan</option>
                <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                <option value="Hurghada">Hurghada</option>
                <option value="Mansoura">Mansoura</option>
                <option value="Tanta">Tanta</option>
                <option value="Port Said">Port Said</option>
              </select>
            </div>
            <div className="input-group gender">
              <label>Gender</label>
              <div className="genderContainer">
                <label htmlFor="male">Male</label>
                <input type="radio" id="male" name="gender" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} required />
              </div>
              <div className="genderContainer">
                <label htmlFor="female">Female</label>
                <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input type="date" id="birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="input-group full-width">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="136 example, example" value={address} onChange={e => setAddress(e.target.value)} required />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
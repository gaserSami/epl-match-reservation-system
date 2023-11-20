import React, { useState } from "react";
import axios from 'axios';
import "../styles/SignUp.css";

function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      await axios.post('http://localhost:5000/users', newUser);
      alert('User created successfully!');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="example" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="example" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="example" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select id="city" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">Select a city</option>
                <option value="cairo">Cairo</option>
                <option value="alexandria">Alexandria</option>
                <option value="giza">Giza</option>
              </select>
            </div>
            <div className="input-group gender">
              <label>Gender</label>
              <div className="genderContainer">
                <label htmlFor="male">Male</label>
                <input type="radio" id="male" name="gender" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} />
              </div>
              <div className="genderContainer">
                <label htmlFor="female">Female</label>
                <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input type="date" id="birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="input-group full-width">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="136 example, example" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}


export default SignUp;
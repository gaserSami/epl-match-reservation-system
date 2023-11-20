import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/PersonalCard.css';

function PersonalCard(props) {

  console.log("====================================")
  console.log("in personal card");
  console.log(props.personalDetails);
  console.log("====================================")
  const [userID, setUserID] = useState(props.personalDetails._id);
  const [firstName, setFirstName] = useState(props.personalDetails.FirstName);
  const [lastName, setLastName] = useState(props.personalDetails.LastName);
  const [city, setCity] = useState(props.personalDetails.City);
  const [gender, setGender] = useState(props.personalDetails.Gender);
  const [email, setEmail] = useState(props.personalDetails.Email);
  const [birthdate, setBirthdate] = useState(new Date(props.personalDetails.DateOfBirth).toISOString().split('T')[0]);
  const [password, setPassword] = useState(props.personalDetails.Password);
  const [address, setAddress] = useState(props.personalDetails.Address);
  const [username, setUsername] = useState(props.personalDetails.Username);

  useEffect(() => {
    if (props.personalDetails) {
      setUserID(props.personalDetails._id);
      setFirstName(props.personalDetails.FirstName);
      setLastName(props.personalDetails.LastName);
      setCity(props.personalDetails.City);
      setGender(props.personalDetails.Gender);
      setEmail(props.personalDetails.Email);
      setBirthdate(new Date(props.personalDetails.DateOfBirth).toISOString().split('T')[0]);
      setPassword(props.personalDetails.Password);
      setAddress(props.personalDetails.Address);
      setUsername(props.personalDetails.Username);
    }
  }, [props.personalDetails]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userID}`);
      const user = response.data;
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setCity(user.City);
      setGender(user.Gender);
      setEmail(user.Email);
      setBirthdate(new Date(user.DateOfBirth).toISOString().split('T')[0]);
      setPassword(user.Password);
      setAddress(user.Address);
      setUsername(user.Username);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const updatedUser = {
      FirstName: firstName,
      LastName: lastName,
      City: city,
      Gender: gender,
      Email: email,
      DateOfBirth: new Date(birthdate),
      Password: password,
      Address: address,
      Username: username,
      UserType: props.personalDetails.UserType,
      State: props.personalDetails.State
    };
  
    try {
      const response = await axios.put(`http://localhost:5000/users/${userID}`, updatedUser);
      fetchUserData(); // Fetch the latest user data after updating it
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="personal-container">
      <div className="personal-card-box">
        <h2>Personal Info</h2>
        <p>Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="example"
                value={username}
                onChange={handleUsernameChange}
                disabled
              />
            </div>
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="example"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="example"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select id="city" value={city} onChange={handleCityChange}>
                <option value="">Select a city</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Giza">Giza</option>
              </select>
            </div>
            <div className="input-group gender">
              <label>Gender</label>
              <div className="genderContainer">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  disabled
                />
              </div>
              <div className="genderContainer">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="input-group full-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="136 example, example"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default PersonalCard;
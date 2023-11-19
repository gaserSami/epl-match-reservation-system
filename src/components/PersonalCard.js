import React, { useState } from "react";
import '../styles/PersonalCard.css';

function PersonalCard(props) {
  const [firstName, setFirstName] = useState(props.personalDetails.firstName);
  const [lastName, setLastName] = useState(props.personalDetails.lastName);
  const [city, setCity] = useState(props.personalDetails.city);
  const [gender, setGender] = useState(props.personalDetails.gender);
  const [email, setEmail] = useState(props.personalDetails.email);
  const [birthdate, setBirthdate] = useState(props.personalDetails.birthdate);
  const [password, setPassword] = useState(props.personalDetails.password);
  const [address, setAddress] = useState(props.personalDetails.address);
  const [username, setUsername] = useState(props.personalDetails.username);

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

  return (
    <div className="personal-container">
      <div className="personal-card-box">
        <h2>Personal Info</h2>
        <p>Please enter your details.</p>
        <form>
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
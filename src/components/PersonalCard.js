/*
  This component is responsible for rendering the personal details card.
  It is used to display the personal details of the user.
*/

// importing dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
// importing styles
import "../styles/PersonalCard.css";

// Define PersonalCard component
function PersonalCard(props) {
  // State variables for personal details
  const [userID, setUserID] = useState(props.personalDetails._id);
  const [firstName, setFirstName] = useState(props.personalDetails.FirstName);
  const [lastName, setLastName] = useState(props.personalDetails.LastName);
  const [city, setCity] = useState(props.personalDetails.City);
  const [gender, setGender] = useState(props.personalDetails.Gender);
  const [email, setEmail] = useState(props.personalDetails.Email);
  const [birthdate, setBirthdate] = useState(
    new Date(props.personalDetails.DateOfBirth).toISOString().split("T")[0]
  );
  const [password, setPassword] = useState("password");
  const [address, setAddress] = useState(props.personalDetails.Address);
  const [username, setUsername] = useState(props.personalDetails.Username);
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userID}`);
      const user = response.data;
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setCity(user.City);
      setGender(user.Gender);
      setEmail(user.Email);
      setBirthdate(new Date(user.DateOfBirth).toISOString().split("T")[0]);
      setPassword("password");
      setAddress(user.Address);
      setUsername(user.Username);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // Update user data on form submission
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
      State: props.personalDetails.State,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userID}`,
        updatedUser
      );
      console.log(response.data);
      fetchUserData(); // Fetch the latest user data after updating it
      setStatusMessage({ text: "Update successful", color: "green" });
    } catch (error) {
      console.error("There was an error!", error);
      setStatusMessage({ text: "Update failed", color: "red" });
    }
  };

  // Event handlers for input changes
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
      <p style={{ color: "red" }}>
        <b>NOTE:</b> don't change password textbox unless you want to change
        password to avoid account loss
      </p>
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
                required
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
                required
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
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                value={city}
                onChange={handleCityChange}
                required
              >
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
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleGenderChange}
                  disabled
                  required
                />
              </div>
              <div className="genderContainer">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleGenderChange}
                  disabled
                  required
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
                required
                disabled
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
                required
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
                required
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
        <p style={{ color: statusMessage.color }}>{statusMessage.text}</p>
      </div>
    </div>
  );
}

export default PersonalCard;

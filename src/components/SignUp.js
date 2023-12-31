/*
  This component provides a form for users to sign up.
  It also handles the submit event on the form.
  It calls the callback function props.onSignUp when the form is submitted.
  It also renders the error message if there is an error during sign up.
  It also renders the error message if any of the fields are empty.
*/

// importing dependencies
import React, { useState, useContext } from "react";
import axios from "axios";
// importing styles
import "../styles/SignUp.css";
// context
import LoadingContext from "./LoadingContext";
import { set } from "mongoose";

// Define SignUp component
function SignUp() {
  // Define state variables
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("fan"); // ['fan', 'EFA'
  const [showPassword, setShowPassword] = useState(false);
  const { setOverlayLoading } = useContext(LoadingContext);

  const getAuthority = (userType) => {
    if (userType === "fan") {
      return "Fan";
    } else if (userType === "EFAmanager") {
      return "EFA Manager";
    } else if (userType === "siteAdmin") {
      return "Site Administrator";
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate inputs
    if (
      !username ||
      !firstName ||
      !lastName ||
      !city ||
      !gender ||
      !email ||
      !birthdate ||
      !password
    ) {
      setError("Please fill in all fields.");
      return;
    }

  // Check for reserved password
  if (password === 'password124#@$%@$') {
    setError("The password 'password124#@$%@$' is reserved. Please choose a different password.");
    return;
  }

    setOverlayLoading(true);
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
      UserType: userType,
    };

    try {
      // Send POST request to create user
      await axios.post("http://localhost:5000/users", newUser);
      setOverlayLoading(false);
      alert("User created successfully!");
      // Reset state
      setUsername("");
      setFirstName("");
      setLastName("");
      setCity("");
      setGender("");
      setEmail("");
      setBirthdate("");
      setPassword("");
      setAddress("");
      setUserType("");
      setError(null);
    } catch (error) {
      setError("Error creating user: " + error.response.data.message);
      setOverlayLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Please enter your details.</p>
        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="example"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="Authority">Authority</label>
              <select
                id="authority"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select Authority</option>
                <option value="fan">{getAuthority("fan")}</option>
                <option value="EFAmanager">{getAuthority("EFAmanager")}</option>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="example"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setGender(e.target.value)}
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
                  onChange={(e) => setGender(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  className="toggle-password-visibility-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="input-group full-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="136 example, example"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

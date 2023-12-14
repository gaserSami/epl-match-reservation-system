/*
  * This component renders the sign in form.
  * It also handles the submit event on the form.
  * It calls the callback function props.onLogin when the form is submitted.
  * It also calls the callback function props.onSignUp when the sign up text is clicked.
  * It also renders the sign up form when the sign up text is clicked.
  * It also renders the error message if there is an error during login.
  * It also renders the error message if username or password is empty.
  * It also renders the error message if the username or password is incorrect.
  */

// importing dependencies
import React, { useState } from "react";
import axios from "axios";
// importing styles
import "../styles/SignIn.css";

// Define SignIn component
function SignIn(props) {
  const [Username, setUsername] = useState(""); // State variable to store the username
  const [Password, setPassword] = useState(""); // State variable to store the password
  const [error, setError] = useState(null); // State variable to store the error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!Username || !Password) {
      setError("Please enter your username and password."); // Set error message if username or password is empty
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        Username,
        Password,
      }); // Send a POST request to the login endpoint with username and password
      // Extract id and authority from response
      const { _id, UserType } = response.data;
      // Call the callback function with id and authority
      props.onLogin(_id, UserType);
    } catch (error) {
      setError(error.response.data); // Set error message if there is an error during login
      console.error("Error logging in:", error);
    }
  };

  // Render the component
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <p>Please enter your details.</p>
        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              id="Username"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <span
            onClick={() => props.onSignUp()}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

// Export SignIn component
export default SignIn;

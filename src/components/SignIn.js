import React, { useState } from "react";
import axios from 'axios';
import "../styles/SignIn.css";

function SignIn(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { Username, Password });
      // Extract id and authority from response
      const { _id, UserType } = response.data;
    // Call the callback function with id and authority
    props.onLogin(_id, UserType);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error here
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <p>Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="Username">Username</label>
            <input type="text" id="Username" placeholder="Username" value={Username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="Password">Password</label>
            <input type="Password" id="Password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signup-text">Don't have an account? <span onClick={() => props.onSignUp()} style={{ cursor: 'pointer', color: 'blue' }}>
              Sign Up
            </span></p>
      </div>
    </div>
  );
}

export default SignIn;
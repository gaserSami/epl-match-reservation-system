import React from "react";
import "../styles/SignIn.css";

function SignIn({ onSignUp}) {
return (
<div className="signin-container">
  <div className="signin-box">
    <h2>Sign In</h2>
    <p>Please enter your details.</p>
    <form>
      <div className="input-group">
        <label for="email">Email address</label>
        <input type="email" id="email" placeholder="example@gmail.com"/>
      </div>
      <div className="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="password"/>
      </div>
      <button type="submit">SIGN IN</button>
    </form>
    <p className="signup-text">Don't have an account? <span onClick={onSignUp} style={{ cursor: 'pointer', color: 'blue' }}>
          Sign Up
        </span></p>
  </div>
</div>
);
}

export default SignIn;
import React from "react";
import "../styles/SignUp.css";



function SignUp() {
return (
<div className="signup-container">
  <div className="signup-box">
    <h2>Sign Up</h2>
    <p>Please enter your details.</p>
    <form>
      <div className="input-row">
        <div className="input-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" placeholder="example"/>
        </div>
        <div className="input-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" placeholder="example"/>
        </div>
        <div className="input-group">
          <label for="city">City</label>
          <select id="city">
            <option value="">Select a city</option>
            <option value="cairo">Cairo</option>
            <option value="alexandria">Alexandria</option>
            <option value="giza">Giza</option>
          </select>
        </div>
        <div className="input-group gender">
          <label>Gender</label>
          <div className="genderContainer">
          <label for="male">Male</label>
            <input type="radio" id="male" name="gender" value="male"/>
          </div>
          <div className="genderContainer">
          <label for="female">Female</label>
            <input type="radio" id="female" name="gender" value="female"/>
          </div>
        </div>
      </div>
      <div className="input-row">
        <div className="input-group">
          <label for="email">Email address</label>
          <input type="email" id="email" placeholder="example@gmail.com"/>
        </div>
        <div className="input-group">
          <label for="birthdate">Birth Date</label>
          <input type="date" id="birthdate"/>
        </div>
        <div className="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="********"/>
        </div>
      </div>
      <div className="input-group full-width">
        <label for="address">Address</label>
        <input type="text" id="address" placeholder="136 example, example"/>
      </div>
      <button type="submit">SIGN UP</button>
    </form>
  </div>
</div>
  );
}

export default SignUp;
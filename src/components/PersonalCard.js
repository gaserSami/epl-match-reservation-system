import React from "react";
import '../styles/PersonalCard.css';


function PersonalCard(props) {

const personalDetails = props.personalDetails;
const firstName = personalDetails.firstName;
const lastName = personalDetails.lastName;
const city = personalDetails.city;
const gender = personalDetails.gender;
const email = personalDetails.email;
const birthdate = personalDetails.birthdate;
const password = personalDetails.password;
const address = personalDetails.address;

return(
<div className="personal-container">
  <div className="personal-card-box">
    <h2>Personal Info</h2>
    <p>Please enter your details.</p>
    <form>
      <div className="input-row">
        <div className="input-group">
          <label for="first-name" >First Name</label>
          <input type="text" id="first-name" placeholder="example" value={firstName}/>
        </div>
        <div className="input-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" placeholder="example" value={lastName}/>
        </div>
        <div className="input-group">
          <label for="city">City</label>
          <select id="city" value={city}>
            <option value="">Select a city</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Giza">Giza</option>
          </select>
        </div>
        <div className="input-group gender">
          <label>Gender</label>
          <div className="genderContainer">
            <label for="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" checked={gender === "male"}/>
          </div>
          <div className="genderContainer">
            <label for="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" checked={gender === "female"}/>
          </div>
        </div>
      </div>
      <div className="input-row">
        <div className="input-group">
          <label for="email" >Email address</label>
          <input type="email" id="email" placeholder="example@gmail.com" value ={email}/>
        </div>
        <div className="input-group">
          <label for="birthdate">Birth Date</label>
          <input type="date" id="birthdate" value={birthdate}/>
        </div>
        <div className="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="********" value={password}/>
        </div>
      </div>
      <div className="input-group full-width">
        <label for="address">Address</label>
        <input type="text" id="address" placeholder="136 example, example" value={address}/>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</div>

);
}

export default PersonalCard;
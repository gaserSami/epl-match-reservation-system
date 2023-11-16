import React from "react";
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';



function MatchDetailsCard() {
  const bookView = (<div className="MatchDetailsCard">
  <div className="teams">
    <span>AL AHlY</span>
    <img src={stadiumIcon} alt="" />
    <span>AL GOUNA</span>
  </div>
  <p className="stadiumInfo">Cairo Stadium, Cairo, Egypt</p>
  <span className="gray">Choose your seat</span>
  <div className="seats">

  </div>
  <div className="ticketInfo">
    <div className="datetime">
    <span className="date gray">25 November 2023</span>
    <span className="time">12:30</span>
    </div>
    <div className="priceBook">
      <span className="price">69.99L.E</span>
    <button>Book now!</button></div>
  </div>
</div>);
const editView = (<div className="match-form-card">
<h2>EGYPTIAN PREMIER LEAGUE</h2>
<form>
  <div className="form-row">
    <div className="input-group">
      <label for="home-team">Home Team</label>
      <select id="home-team">
        <option value="">Select home team</option>
        <option value="al-ahly">Al Ahly</option>
      </select>
    </div>
    <div className="input-group">
      <label for="away-team">Away Team</label>
      <select id="away-team">
        <option value="">Select away team</option>
        <option value="el-gouna">El Gouna</option>
      </select>
    </div>
    <div className="input-group">
      <label for="date">Date</label>
      <input type="date" id="date"/>
    </div>
    <div className="input-group">
      <label for="time">Time</label>
      <input type="time" id="time"/>
    </div>
  </div>
  <div className="form-row">
    <div className="input-group">
      <label for="stadium">Stadium</label>
      <select id="stadium">
        <option value="">Select stadium</option>
        <option value="cairo-stadium">Cairo Stadium</option>
      </select>
    </div>
    <div className="input-group">
      <label for="price">Price</label>
      <input type="number" id="price" placeholder="Enter price"/>
    </div>
  </div>
  <button type="submit">Save</button>
</form>
</div>
);
return (
  editView
);
}

export default MatchDetailsCard;
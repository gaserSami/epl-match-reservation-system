import React from "react";
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';



function MatchDetailsCard(props) {

  const matchDetails = props.matchDetails;
  const date = new Date(matchDetails.date);
  const month = date.toLocaleString('default', { month: 'long' });
  const time = matchDetails.time;
  const homeTeam = matchDetails.homeTeam;
  const awayTeam = matchDetails.awayTeam;
  const stadium = matchDetails.stadium;
  const price = matchDetails.price;



  const bookView = (<div className="MatchDetailsCard">
  <div className="teams">
    <span>{homeTeam}</span>
    <img src={stadiumIcon} alt="" />
    <span>{awayTeam}</span>
  </div>
  <p className="stadiumInfo">{stadium}, Cairo, Egypt</p>
  <span className="gray">Choose your seat</span>
  <div className="seats">

  </div>
  <div className="ticketInfo">
    <div className="datetime">
    <span className="date gray">{date.getDate()} {month} {date.getFullYear()}</span>
    <span className="time">{time}</span>
    </div>
    <div className="priceBook">
      <span className="price">{price} L.E</span>
    <button>Book now!</button></div>
  </div>
</div>);
  const guestView = (<div className="MatchDetailsCard">
  <div className="teams">
    <span>{homeTeam}</span>
    <img src={stadiumIcon} alt="" />
    <span>{awayTeam}</span>
  </div>
  <p className="stadiumInfo">{stadium}, Cairo, Egypt</p>
  <span className="gray">Choose your seat</span>
  <div className="seats">

  </div>
  <div className="ticketInfo">
    <div className="datetime">
    <span className="date gray">{date.getDate()} {month} {date.getFullYear()}</span>
    <span className="time">{time}</span>
    </div>
    <div className="priceBook">
      <span className="price">{price} L.E</span>
    <button className="disabled">Book now!</button></div>
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
        <option value="al-ahly">{homeTeam}</option>
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
      <input type="date" id="date" value={date}/>
    </div>
    <div className="input-group">
      <label for="time">Time</label>
      <input type="time" id="time" value={time}/>
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
      <input type="number" id="price" placeholder="Enter price" value={price}/>
    </div>
  </div>
  <button type="submit">Save</button>
</form>
</div>
);
switch (props.view) {
  case 'guestView':
    return guestView;
  case 'editView':
    return editView;
  case 'bookView':
    return bookView;
  default:
    return guestView;
}
}

export default MatchDetailsCard;
import React, { useState } from "react";
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';

function MatchDetailsCard(props) {
  const [matchDetails, setMatchDetails] = useState(props.matchDetails || {
    homeTeam: "",
    awayTeam: "",
    date: new Date(),
    time: "",
    stadium: "",
    price: ""
  });

  const handleHomeTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, homeTeam: e.target.value });
  };

  const handleAwayTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, awayTeam: e.target.value });
  };

  const handleDateChange = (e) => {
    setMatchDetails({ ...matchDetails, date: new Date(e.target.value) });
  };

  const handleTimeChange = (e) => {
    setMatchDetails({ ...matchDetails, time: e.target.value });
  };

  const handleStadiumChange = (e) => {
    setMatchDetails({ ...matchDetails, stadium: e.target.value });
  };

  const handlePriceChange = (e) => {
    setMatchDetails({ ...matchDetails, price: e.target.value });
  };

  const bookView = (
    <div className="MatchDetailsCard">
      <div className="teams">
        <span>{matchDetails.homeTeam}</span>
        <img src={stadiumIcon} alt="" />
        <span>{matchDetails.awayTeam}</span>
      </div>
      <p className="stadiumInfo">{matchDetails.stadium}, Cairo, Egypt</p>
      <span className="gray">Choose your seat</span>
      <div className="seats"></div>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {new Date(matchDetails.date).getDate()} {new Date(matchDetails.date).toLocaleString('default', { month: 'long' })} {new Date(matchDetails.date).getFullYear()}
          </span>
          <span className="time">{matchDetails.time}</span>
        </div>
        <div className="priceBook">
          <span className="price">{matchDetails.price} L.E</span>
          <button>Book now!</button>
        </div>
      </div>
    </div>
  );

  const guestView = (
    <div className="MatchDetailsCard">
      <div className="teams">
        <span>{matchDetails.homeTeam}</span>
        <img src={stadiumIcon} alt="" />
        <span>{matchDetails.awayTeam}</span>
      </div>
      <p className="stadiumInfo">{matchDetails.stadium}, Cairo, Egypt</p>
      <span className="gray">Choose your seat</span>
      <div className="seats"></div>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {new Date(matchDetails.date).getDate()} {new Date(matchDetails.date).toLocaleString('default', { month: 'long' })} {new Date(matchDetails.date).getFullYear()}
          </span>
          <span className="time">{matchDetails.time}</span>
        </div>
        <div className="priceBook">
          <span className="price">{matchDetails.price} L.E</span>
          <button className="disabled">Book now!</button>
        </div>
      </div>
    </div>
  );

  const editView = (
    <div className="match-form-card">
      <h2>EGYPTIAN PREMIER LEAGUE</h2>
      <form>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="home-team">Home Team</label>
            <select
              id="home-team"
              value={matchDetails.homeTeam}
              onChange={handleHomeTeamChange}
            >
              <option value="">Select home team</option>
              <option value={matchDetails.homeTeam}>{matchDetails.homeTeam}</option>
              <option value={matchDetails.awayTeam}>{matchDetails.awayTeam}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="away-team">Away Team</label>
            <select
              id="away-team"
              value={matchDetails.awayTeam}
              onChange={handleAwayTeamChange}
            >
              <option value="">Select away team</option>
              <option value={matchDetails.homeTeam}>{matchDetails.homeTeam}</option>
              <option value={matchDetails.awayTeam}>{matchDetails.awayTeam}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={new Date(matchDetails.date).toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={matchDetails.time} onChange={handleTimeChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="stadium">Stadium</label>
            <select id="stadium" value={matchDetails.stadium} onChange={handleStadiumChange}>
              <option value="">Select stadium</option>
              <option value={matchDetails.stadium}>{matchDetails.stadium}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={matchDetails.price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );

  switch (props.view) {
    case "guestView":
      return guestView;
    case "editView":
      return editView;
    case "bookView":
      return bookView;
    default:
      return guestView;
  }
}

export default MatchDetailsCard;
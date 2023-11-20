import React, { useState } from "react";
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';
import SeatsReservation from "./SeatsReservation";
import { useEffect } from "react";
import { useRef } from "react";

function MatchDetailsCard(props) {
  const rows =20;
  const cols = 20;
  const [matchDetails, setMatchDetails] = useState(props.matchDetails);
  const [stadiumDetails, setStadiumDetails] = useState(props.stadiumDetails);
  const stadium = stadiumDetails ? stadiumDetails.StadiumName : 'Loading...';

 

  const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      var height = cardRef.current.offsetHeight;
      let marginTop = height * 0.00; // adjust the multiplier as needed
      const marginBottom = height * 0.00; // adjust the multiplier as needed
      if(rows >=50 && rows < 100){
       marginTop = height * 0.02; // adjust the multiplier as needed
      }
      else if(rows >=100 && rows <= 150){
        marginTop = height * 0.05; // adjust the multiplier as needed
      }
      cardRef.current.style.marginTop = `${marginTop}%`;
      cardRef.current.style.marginBottom = `${marginBottom}%`;
    }
  }, []);

  const handleHomeTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, HomeTeam: e.target.value });
  };

  const handleAwayTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, AwayTeam: e.target.value });
  };

  const handleDateChange = (e) => {
    setMatchDetails({ ...matchDetails, MatchDate: new Date(e.target.value) });
  };

  const handleTimeChange = (e) => {
    setMatchDetails({ ...matchDetails, MatchTime: e.target.value });
  };

  const handleStadiumChange = (e) => {
    setMatchDetails({ ...matchDetails, StadiumID: e.target.value });
  };

  const handlePriceChange = (e) => {
    setMatchDetails({ ...matchDetails, Price: e.target.value });
  };

  const bookView = (
    <div className="MatchDetailsCard" ref={cardRef}>
      <div className="teams">
        <span>{matchDetails.HomeTeam}</span>
        <img src={stadiumIcon} alt="" />
        <span>{matchDetails.AwayTeam}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Cairo, Egypt</p>
      <span className="gray">Choose your seat</span>
      <SeatsReservation rows={rows} cols={cols}/>
            <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {new Date(matchDetails.MatchDate).getDate()} {new Date(matchDetails.MatchDate).toLocaleString('default', { month: 'long' })} {new Date(matchDetails.MatchDate).getFullYear()}
          </span>
          <span className="time">{matchDetails.MatchTime}</span>
        </div>
        <div className="priceBook">
          <span className="price">{matchDetails.Price} L.E</span>
          <button onClick={() => props.handlePaymentCard()}>Book now!</button>
        </div>
      </div>
    </div>
  );

  const guestView = (
    <div className="MatchDetailsCard">
      <div className="teams">
        <span>{matchDetails.HomeTeam}</span>
        <img src={stadiumIcon} alt="" />
        <span>{matchDetails.AwayTeam}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Cairo, Egypt</p>
      <span className="gray">Choose your seat</span>
      <SeatsReservation rows={rows} cols={cols} disabled={true}/>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {new Date(matchDetails.MatchDate).getDate()} {new Date(matchDetails.MatchDate).toLocaleString('default', { month: 'long' })} {new Date(matchDetails.MatchDate).getFullYear()}
          </span>
          <span className="time">{matchDetails.MatchTime}</span>
        </div>
        <div className="priceBook">
          <span className="price">{matchDetails.Price} L.E</span>
          <button className="disabled">Book now!</button>
        </div>
      </div>
    </div>
  );

  const reservedView = (
    <div className="MatchDetailsCard">
      <div className="teams">
        <span>{matchDetails.HomeTeam}</span>
        <img src={stadiumIcon} alt="" />
        <span>{matchDetails.AwayTeam}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Cairo, Egypt</p>
      <span className="gray">Ticket#{matchDetails.ticketNumber} | your Seats are in yellow </span>
      <SeatsReservation rows={rows} cols={cols} disabled={true}/>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {new Date(matchDetails.MatchDate).getDate()} {new Date(matchDetails.MatchDate).toLocaleString('default', { month: 'long' })} {new Date(matchDetails.MatchDate).getFullYear()}
          </span>
          <span className="time">{matchDetails.MatchTime}</span>
        </div>
        <div className="priceBook">
          <span className="price">{matchDetails.Price} L.E</span>
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
              value={matchDetails.HomeTeam}
              onChange={handleHomeTeamChange}
            >
              <option value="">Select home team</option>
              <option value={matchDetails.HomeTeam}>{matchDetails.HomeTeam}</option>
              <option value={matchDetails.AwayTeam}>{matchDetails.AwayTeam}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="away-team">Away Team</label>
            <select
              id="away-team"
              value={matchDetails.AwayTeam}
              onChange={handleAwayTeamChange}
            >
              <option value="">Select away team</option>
              <option value={matchDetails.HomeTeam}>{matchDetails.HomeTeam}</option>
              <option value={matchDetails.AwayTeam}>{matchDetails.AwayTeam}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={new Date(matchDetails.MatchDate).toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={matchDetails.MatchTime} onChange={handleTimeChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="stadium">Stadium</label>
            <select id="stadium" value={stadium} onChange={handleStadiumChange}>
              <option value="">Select stadium</option>
              <option value={stadium}>{stadium}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={matchDetails.Price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <button type="submit" >Save</button>
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
    case "reservedView":
      return reservedView;
    default:
      return guestView;
  }
}

export default MatchDetailsCard;
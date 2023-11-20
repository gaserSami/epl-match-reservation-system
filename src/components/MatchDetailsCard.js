import React, { useState } from "react";
import axios from 'axios';
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';
import SeatsReservation from "./SeatsReservation";
import { useEffect } from "react";
import { useRef } from "react";

function MatchDetailsCard(props) {
  const rows =20;
  const cols = 20;
  const [matchDetails, setMatchDetails] = useState(props.matchDetails || {
    HomeTeam: "",
        AwayTeam: "",
        MatchDate: new Date(),
        MatchTime: "00:00:00",
        StadiumID: "",
        Price: "",
        MainReferee: "",
        Lineman1: "",
        Lineman2: ""
  });
  const [stadiumDetails, setStadiumDetails] = useState(props.stadiumDetails);
  const stadium = stadiumDetails ? stadiumDetails.StadiumName : 'Loading...';

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, ...update } = matchDetails;
      const response = await axios.put(`http://localhost:5000/matches/${_id}`, update);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, ...newMatch } = matchDetails;
      console.log(newMatch);
      const response = await axios.post('http://localhost:5000/matches', newMatch);
      console.log(response.data);
      setMatchDetails({
        HomeTeam: "",
        AwayTeam: "",
        MatchDate: new Date(),
        MatchTime: "00:00:00",
        StadiumID: "",
        Price: "",
        MainReferee: "",
        Lineman1: "",
        Lineman2: ""
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

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

  const handleRefereeChange = (e) => {
    setMatchDetails({ ...matchDetails, MainReferee: e.target.value });
  };

  const handleLineman1Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman1: e.target.value });

  };

  const handleLineman2Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman2: e.target.value });
  };

  const handleMainRefereeChange = (e) => {
    setMatchDetails({ ...matchDetails, MainReferee: e.target.value });
  };

  const handleLinesman1Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman1: e.target.value });

  };

  const handleLinesman2Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman2: e.target.value });
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
      <form onSubmit={handleEditSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="home-team">Home Team</label>
            <select
              id="home-team"
              value={matchDetails.HomeTeam}
              onChange={handleHomeTeamChange}
            >
              <option>Select home team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team.TeamName}>
                    {team.TeamName}
                  </option>
                ))}
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
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team.TeamName}>
                    {team.TeamName}
                  </option>
                ))}
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
              <option value="">Select Stadium</option>
              {props.stadiums &&
                props.stadiums.map((stadium, index) => (
                  <option key={index} value={stadium._id}>
                    {stadium.StadiumName}
                  </option>
                ))}
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
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={matchDetails.MainReferee}
              onChange={handleRefereeChange}
            >
              <option value="">Select referee</option>
              {props.referees &&
                props.referees.map((referee, index) => (
                  <option key={index} value={referee.Name}>
                    {referee.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman1">Linesman 1</label>
            <select
              id="linesman1"
              value={matchDetails.Linesman1}
              onChange={handleLinesman1Change}
            >
              <option value="">Select linesman 1</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman.Name}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman2">Linesman 2</label>
            <select
              id="linesman2"
              value={matchDetails.Linesman2}
              onChange={handleLinesman2Change}
            >
              <option value="">Select linesman 2</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman.Name}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
  const addView = (
    <div className="match-form-card">
      <h2>EGYPTIAN PREMIER LEAGUE</h2>
      <form onSubmit={handleAddSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="home-team">Home Team</label>
            <select
              id="home-team"
              value={matchDetails.HomeTeam}
              onChange={handleHomeTeamChange}
            >
              <option value="">Select home team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team.TeamName}>
                    {team.TeamName}
                  </option>
                ))}
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
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team.TeamName}>
                    {team.TeamName}
                  </option>
                ))}
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
              <option value="">Select Stadium</option>
              {props.stadiums &&
                props.stadiums.map((stadium, index) => (
                  <option key={index} value={stadium._id}>
                    {stadium.StadiumName}
                  </option>
                ))}
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
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={matchDetails.MainReferee}
              onChange={handleRefereeChange}
            >
              <option value="">Select referee</option>
              {props.referees &&
                props.referees.map((referee, index) => (
                  <option key={index} value={referee.Name}>
                    {referee.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman1">Linesman 1</label>
            <select
              id="linesman1"
              value={matchDetails.Linesman1}
              onChange={handleLinesman1Change}
            >
              <option value="">Select linesman 1</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman.Name}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman2">Linesman 2</label>
            <select
              id="linesman2"
              value={matchDetails.Linesman2}
              onChange={handleLinesman2Change}
            >
              <option value="">Select linesman 2</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman.Name}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
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
    case "reservedView":
      return reservedView;
      case "addView":
      return addView;
    default:
      return guestView;
  }
}

export default MatchDetailsCard;
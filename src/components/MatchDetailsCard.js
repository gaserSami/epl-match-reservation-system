// Import dependencies
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import files
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';
import SeatsReservation from "./SeatsReservation";

function MatchDetailsCard(props) {
  // State to store match details
  const [matchDetails, setMatchDetails] = useState(props.matchDetails);
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [date, setMatchDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [stadium, setStadium] = useState('');
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [refereeName, setRefereeName] = useState('');
  const [lineman1Name, setLineman1Name] = useState('');
  const [lineman2Name, setLineman2Name] = useState('');
  const [price, setPrice] = useState(0);
  // Destructure matchDetails object
  

 // fetch data initially
 useEffect(() => {
  setMatchDetails(props.matchDetails);
  console.log("====================================")
  console.log(matchDetails);
  console.log(props.matchDetails);
  console.log("====================================")
  const {
    StadiumID: { Rows: rows } = {},
    StadiumID: { Columns: cols } = {},
  } = props.matchDetails || {};
  setRows(rows);
  setCols(cols);
}, [props.matchDetails]);

  useEffect(() => {
    const {
      HomeTeamID: { TeamName: homeTeamName } = {},
      AwayTeamID: { TeamName: awayTeamName } = {},
      MatchDate: matchDate,
      MatchTime: time,
      StadiumID: { StadiumName: stadium } = {},
      MainRefereeID: { Name: refereeName } = {},
      Lineman1ID: { Name: lineman1Name } = {},
      Lineman2ID: { Name: lineman2Name }  = {},
      Price: price = 0,
    } = matchDetails || {};
  
    setHomeTeamName(homeTeamName);
    setAwayTeamName(awayTeamName);
    setMatchDate(isNaN(Date.parse(matchDate)) ? null : new Date(matchDate));
    setTime(time);
    setStadium(stadium);
    setRefereeName(refereeName);
    setLineman1Name(lineman1Name);
    setLineman2Name(lineman2Name);
    setPrice(price);
    // update other state variables
  }, [matchDetails]);


  // Handle form submit for editing match details
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

  // Handle form submit for adding a new match
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, ...newMatch } = matchDetails;
      console.log(newMatch);
      const response = await axios.post('http://localhost:5000/matches', newMatch);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // Reference to the match card element
  const cardRef = useRef();

  // Adjust the margin of the match card based on the number of rows
  useEffect(() => {
    if (cardRef.current) {
      var height = cardRef.current.offsetHeight;
      let marginTop = height * 0.00; // adjust the multiplier as needed
      const marginBottom = height * 0.00; // adjust the multiplier as needed
      if (rows >= 50 && rows < 100) {
        marginTop = height * 0.02; // adjust the multiplier as needed
      } else if (rows >= 100 && rows <= 150) {
        marginTop = height * 0.05; // adjust the multiplier as needed
      }
      cardRef.current.style.marginTop = `${marginTop}%`;
      cardRef.current.style.marginBottom = `${marginBottom}%`;
    }
  }, []);

  // Handle home team selection change
  const handleHomeTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, HomeTeam: e.target.value });
  };

  // Handle away team selection change
  const handleAwayTeamChange = (e) => {
    setMatchDetails({ ...matchDetails, AwayTeam: e.target.value });
  };

  // Handle match date change
  const handleDateChange = (e) => {
    setMatchDetails({ ...matchDetails, MatchDate: new Date(e.target.value) });
  };

  // Handle match time change
  const handleTimeChange = (e) => {
    setMatchDetails({ ...matchDetails, MatchTime: e.target.value });
  };

  // Handle stadium change
  const handleStadiumChange = (e) => {
    setMatchDetails({ ...matchDetails, StadiumID: e.target.value });
  };

  // Handle price change
  const handlePriceChange = (e) => {
    setMatchDetails({ ...matchDetails, Price: e.target.value });
  };

  // Handle referee change
  const handleRefereeChange = (e) => {
    setMatchDetails({ ...matchDetails, MainReferee: e.target.value });
  };

  // Handle lineman 1 change
  const handleLineman1Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman1: e.target.value });
  };

  // Handle lineman 2 change
  const handleLineman2Change = (e) => {
    setMatchDetails({ ...matchDetails, Lineman2: e.target.value });
  };

  const bookView = (
    <div className="MatchDetailsCard" ref={cardRef}>
      <div className="teams">
        <span>{homeTeamName}</span>
        <img src={stadiumIcon} alt="" />
        <span>{awayTeamName}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Egypt</p>
      <span className="gray">Choose your seat</span>
      <SeatsReservation rows={rows} cols={cols}/>
            <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </span>
          <span className="time">{time}</span>
        </div>
        <div className="priceBook">
          <span className="price">{price} L.E</span>
          <button onClick={() => props.handlePaymentCard()}>Book now!</button>
        </div>
      </div>
    </div>
  );

  const guestView = (
    <div className="MatchDetailsCard" ref={cardRef}>
      <div className="teams">
        <span>{homeTeamName}</span>
        <img src={stadiumIcon} alt="" />
        <span>{awayTeamName}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Egypt</p>
      <span className="gray">Choose your seat</span>
      <SeatsReservation rows={rows} cols={cols} disabled={true}/>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </span>
          <span className="time">{time}</span>
        </div>
        <div className="priceBook">
          <span className="price">{price} L.E</span>
          <button className="disabled">Book now!</button>
        </div>
      </div>
    </div>
  );

  const reservedView = (
    <div className="MatchDetailsCard" ref={cardRef}>
      <div className="teams">
        <span>{homeTeamName}</span>
        <img src={stadiumIcon} alt="" />
        <span>{awayTeamName}</span>
      </div>
      <p className="stadiumInfo">{stadium}, Egypt</p>
      <span className="gray">Ticket#{231} | your Seats are in yellow </span>
      <SeatsReservation rows={rows} cols={cols} disabled={true}/>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </span>
          <span className="time">{time}</span>
        </div>
        <div className="priceBook">
          <span className="price">{price} L.E</span>
          <button className="disabled">Book now!</button>
        </div>
      </div>
    </div>
  );

  const editView = (
    <div className="match-form-card" ref={cardRef}>
      <h2>EGYPTIAN PREMIER LEAGUE</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="home-team">Home Team</label>
            <select
              id="home-team"
              value={homeTeamName}
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
              value={awayTeamName}
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
              value={date.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={time} onChange={handleTimeChange} />
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
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={refereeName}
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
              value={lineman1Name}
              onChange={handleLineman1Change}
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
              value={lineman2Name}
              onChange={handleLineman2Change}
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
    <div className="match-form-card" ref={cardRef}>
      <h2>EGYPTIAN PREMIER LEAGUE</h2>
      <form onSubmit={handleAddSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="home-team">Home Team</label>
            <select
              id="home-team"
              value={homeTeamName}
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
              value={awayTeamName}
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
              value={date.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={time} onChange={handleTimeChange} />
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
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={refereeName}
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
              value={lineman1Name}
              onChange={handleLineman1Change}
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
              value={lineman2Name}
              onChange={handleLineman2Change}
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
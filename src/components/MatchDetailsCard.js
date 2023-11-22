// Import dependencies
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import files
import "../styles/MatchDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';
import SeatsReservation from "./SeatsReservation";
import { set } from "mongoose";

function MatchDetailsCard(props) {
  // State to store match details
  const [matchDetails, setMatchDetails] = useState(props.matchDetails);
  // for update
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [date, setMatchDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [stadiumID, setStadiumID] = useState('');
  const [stadiumName, setStadiumName] = useState('');
  const [close, setClose] = useState(false);
  const {
    StadiumID: { Rows: rows1 } = {},
    StadiumID: { Columns: cols1 } = {},
  } = props.matchDetails || {};
  const [rows, setRows] = useState(rows1);
  const [cols, setCols] = useState(cols1);
  const [refereeName, setRefereeName] = useState('');
  const [lineman1Name, setLineman1Name] = useState('');
  const [lineman2Name, setLineman2Name] = useState('');
  const [price, setPrice] = useState(0);
  const [homeTeamID, setHomeTeamID] = useState('');
  const [awayTeamID, setAwayTeamID] = useState('');
  const [mainRefereeID, setMainRefereeID] = useState('');
  const [lineman1ID, setLineman1ID] = useState('');
  const [lineman2ID, setLineman2ID] = useState('');
  // Destructure matchDetails object
  //function
  const [refresher, setRefresher] = useState(false);
  const {forceMainPageRender} = props;

  useEffect(() => {
    forceMainPageRender();
  }, [refresher]);
  
 // useEffect(() => {
  //  props.handleClose();
  //}, [close]);

 
 useEffect(() => {
  setMatchDetails(props.matchDetails);
  if(props.view !== 'addView'){
    const {
      StadiumID: { Rows: rows1 } = {},
      StadiumID: { Columns: cols1 } = {},
      StadiumID: { StadiumName: stadiumName } = {},
      HomeTeamID: { TeamName: homeTeamName } = {},
      AwayTeamID: { TeamName: awayTeamName } = {},
      MatchDate: matchDate = new Date(),
      MatchTime: time = '',
      StadiumID: { _id: stadiumID } = {},
      MainRefereeID: { Name: refereeName } = {},
      Lineman1ID: { Name: lineman1Name } = {},
      Lineman2ID: { Name: lineman2Name }  = {},
      HomeTeamID: {_id:homeTeamID} = {},
      AwayTeamID: {_id:awayTeamID} = {},
      MainRefereeID: {_id:mainRefereeID} = {},
      Lineman1ID: {_id:lineman1ID} = {},
      Lineman2ID: {_id:lineman2ID} = {},
      Price: price = 0
    } = props.matchDetails || {};
    setRows(rows1);
    setCols(cols1);
    setHomeTeamName(homeTeamName);
    setAwayTeamName(awayTeamName);
    setMatchDate(isNaN(Date.parse(matchDate)) ? null : new Date(matchDate));
    setTime(time);
    setStadiumID(stadiumID);
    setRefereeName(refereeName);
    setLineman1Name(lineman1Name);
    setLineman2Name(lineman2Name);
    setPrice(price);
    setHomeTeamID(homeTeamID);
    setAwayTeamID(awayTeamID);
    setMainRefereeID(mainRefereeID);
    setLineman1ID(lineman1ID);
    setLineman2ID(lineman2ID);
    setStadiumName(stadiumName);
  }
  else{
    setHomeTeamName('');
    setAwayTeamName('');
    setMatchDate(new Date());
    setTime('');
    setStadiumID('');
    setRefereeName('');
    setLineman1Name('');
    setLineman2Name('');
    setPrice(0);
    setHomeTeamID('');
    setAwayTeamID('');
    setMainRefereeID('');
    setLineman1ID('');
    setLineman2ID('');
    setStadiumName('');
  }
}, [props.matchDetails]);



  // Handle form submit for editing match details
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, ...detailsToUpdate } = matchDetails;
      const update = {
        ...detailsToUpdate, // Spread the remaining properties
        HomeTeamID: homeTeamID, // Updated home team ID
        AwayTeamID: awayTeamID, // Updated away team ID
        MatchDate: date, // Updated match date
        MatchTime: time, // Updated match time
        StadiumID: stadiumID, // Updated stadium ID
        MainRefereeID: mainRefereeID, // Updated main referee ID
        Lineman1ID: lineman1ID, // Updated lineman 1 ID
        Lineman2ID: lineman2ID, // Updated lineman 2 ID
        Price: price // Updated price
      };
      const response = await axios.put(`http://localhost:5000/matches/${_id}`, update);
      console.log(response.data);
      alert('Match details updated successfully!');
      setMatchDetails(update);
      setRefresher(prev => !prev);
      setClose(true);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // Handle form submit for adding a new match
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
     // Create a new match object from the individual state variables
    const newMatch = {
      HomeTeamID: homeTeamID, // Updated home team ID
      AwayTeamID: awayTeamID, // Updated away team ID
      MatchDate: date, // Updated match date
      MatchTime: time, // Updated match time
      StadiumID: stadiumID, // Updated stadium ID
      MainRefereeID: mainRefereeID, // Updated main referee ID
      Lineman1ID: lineman1ID, // Updated lineman 1 ID
      Lineman2ID: lineman2ID, // Updated lineman 2 ID
      Price: price // Updated price
    };
      console.log(newMatch);
      const response = await axios.post('http://localhost:5000/matches', newMatch);
      console.log(response.data);
      alert('Match details added successfully!');
      setRefresher(prev => !prev);
    } catch (error) {
      alert('There was an error! Please check your inputs.');
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
  const handleHomeTeamChange = (event) => {
    // Set the homeTeamID state to the value of the selected option
    setHomeTeamID(event.target.value);
  };
  

  // Handle away team selection change
  const handleAwayTeamChange = (e) => {
    setAwayTeamID(e.target.value);
  };

  // Handle match date change
  const handleDateChange = (e) => {
    setMatchDate(new Date(e.target.value));
  };

  // Handle match time change
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // Handle stadium change
  const handleStadiumChange = (e) => {
    setStadiumID(e.target.value);
  };

  // Handle price change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Handle referee change
  const handleRefereeChange = (e) => {
    setMainRefereeID(e.target.value);
  };

  // Handle lineman 1 change
  const handleLineman1Change = (e) => {
    setLineman1ID(e.target.value);
  };

  // Handle lineman 2 change
  const handleLineman2Change = (e) => {
    setLineman2ID(e.target.value);
  };

  const bookView = (
    <div className="MatchDetailsCard" ref={cardRef}>
      <div className="teams">
        <span>{homeTeamName}</span>
        <img src={stadiumIcon} alt="" />
        <span>{awayTeamName}</span>
      </div>
      <p className="stadiumInfo">{stadiumName}, Egypt</p>
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
      <p className="stadiumInfo">{stadiumName}, Egypt</p>
      <span className="gray">Choose your seat</span>
      <SeatsReservation rows={rows} cols={cols} disabled={true}/>
      <div className="ticketInfo">
        <div className="datetime">
          <span className="date gray">
            {date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </span>
          <span className="time">{time}</span>
        </div>
        <div className="referee-lineman">
          <span>Referee <div>{refereeName}</div></span>
          <span>Lineman1 <div>{lineman1Name}</div></span>
          <span>Lineman2 <div>{lineman2Name}</div></span>
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
      <p className="stadiumInfo">{stadiumName}, Egypt</p>
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
              value={homeTeamID}
              onChange={handleHomeTeamChange}
              required
            >
              <option>Select home team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team._id}>
                    {team.TeamName}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="away-team">Away Team</label>
            <select
              id="away-team"
              value={awayTeamID}
              onChange={handleAwayTeamChange}
              required
            >
              <option value="">Select away team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team._id}>
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
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="stadium">Stadium</label>
            <select
              id="stadium"
              value={stadiumID}
              onChange={handleStadiumChange}
              required
            >
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
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={mainRefereeID}
              onChange={handleRefereeChange}
              required
            >
              <option value="">Select referee</option>
              {props.referees &&
                props.referees.map((referee, index) => (
                  <option key={index} value={referee._id}>
                    {referee.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman1">Linesman 1</label>
            <select
              id="linesman1"
              value={lineman1ID}
              onChange={handleLineman1Change}
              required
            >
              <option value="">Select linesman 1</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman._id}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman2">Linesman 2</label>
            <select
              id="linesman2"
              value={lineman2ID}
              onChange={handleLineman2Change}
              required
            >
              <option value="">Select linesman 2</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman._id}>
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
              value={homeTeamID}
              onChange={handleHomeTeamChange}
              required
            >
              <option>Select home team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team._id}>
                    {team.TeamName}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="away-team">Away Team</label>
            <select
              id="away-team"
              value={awayTeamID}
              onChange={handleAwayTeamChange}
              required
            >
              <option value="">Select away team</option>
              {props.teams &&
                props.teams.map((team, index) => (
                  <option key={index} value={team._id}>
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
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="stadium">Stadium</label>
            <select
              id="stadium"
              value={stadiumID}
              onChange={handleStadiumChange}
              required
            >
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
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="referee">Referee</label>
            <select
              id="referee"
              value={mainRefereeID}
              onChange={handleRefereeChange}
              required
            >
              <option value="">Select referee</option>
              {props.referees &&
                props.referees.map((referee, index) => (
                  <option key={index} value={referee._id}>
                    {referee.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman1">Linesman 1</label>
            <select
              id="linesman1"
              value={lineman1ID}
              onChange={handleLineman1Change}
              required
            >
              <option value="">Select linesman 1</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman._id}>
                    {linesman.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="linesman2">Linesman 2</label>
            <select
              id="linesman2"
              value={lineman2ID}
              onChange={handleLineman2Change}
              required
            >
              <option value="">Select linesman 2</option>
              {props.linesmen &&
                props.linesmen.map((linesman, index) => (
                  <option key={index} value={linesman._id}>
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
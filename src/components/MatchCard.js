import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MatchCard.css';
import editIcon from '../assets/editing.png';

const MatchCard = (props) => {
  // State to store match details
  const [matchDetails, setMatchDetails] = useState(props.matchDetails || {});
  const [matchID, setMatchID] = useState(props.matchDetails._id);

  // Update matchDetails when props.matchDetails changes
  useEffect(() => {
    setMatchDetails(props.matchDetails);
  }, [props.matchDetails]);

  // Destructure matchDetails object
  const {
    HomeTeamID: { TeamName: homeTeamName } = {},
    AwayTeamID: { TeamName: awayTeamName } = {},
    MatchDate: matchDate,
    MatchTime: time,
    StadiumID: { StadiumName: stadium } = {},
    Price: price
  } = matchDetails || {};

  // Format date
  const date = isNaN(Date.parse(matchDate)) ? null : new Date(matchDate);
  const month = date.toLocaleString('default', { month: 'long' });

  // Generate random ticket number
  const ticketNumber = Math.floor(Math.random() * 1000000) + 1;
  // Generate match title
  const title = `${homeTeamName} vs ${awayTeamName}`;

  // Re-render MainPage when forceMainPageRender changes
  useEffect(() => {
    // Your code here...
    console.log('forceMainPageRender');
    console.log('useEffect');
  }, [props.triggerMainPageRender]);

  // Guest view of the match card
  const guestView = (
    <div className="matchCard">
      <div className="date">
        <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>EGYPTIAN PREMIER LEAGUE</h2>
        <h1 className='teams'>{title}</h1>
        <span className='time'>{time}</span>
        <p className='stadium'>{stadium}, Egypt</p>
      </div>
      <div className="price">
        {price} L.E
      </div>
      <div className="buttons">
        <button onClick={() => props.handleTicketsClick('guestView', matchDetails)}>Tickets</button>
      </div>
    </div>
  );

  // Fan view of the match card
  const fanView = (
    <div className="matchCard">
      <div className="date">
      <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>EGYPTIAN PREMIER LEAGUE</h2>
        <h1 className='teams'>{title}</h1>
        <span className='time'>{time}</span>
        <p className='stadium'>{stadium}, Egypt</p>
      </div>
      <div className="price">
        {price} L.E
      </div>
      <div className="buttons">
        <button onClick={() => props.handleTicketsClick('bookView', matchDetails)}>Tickets</button>
      </div>
    </div>
  );

  // Edit view of the match card
  const editView = (
    <div className="matchCard">
      <div className="date">
      <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>EGYPTIAN PREMIER LEAGUE</h2>
        <h1 className='teams'>{title}</h1>
        <span className='time'>{time}</span>
        <p className='stadium'>{stadium}, Egypt</p>
      </div>
      <div className="price">
        {price} L.E
      </div>
      <div className="buttons">
        <button onClick={() => props.handleTicketsClick('guestView', matchDetails)}>Tickets</button>
        <button onClick={() => props.handleTicketsClick('editView', matchDetails)}><img src={editIcon} alt="" /></button>
      </div>
    </div>
  );

  // Reserved view of the match card
  const reservedView = (
    <div className="matchCard">
      <div className="date">
      <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>#{ticketNumber}</h2>
        <h1 className='teams'>{title}</h1>
        <span className='time'>{time}</span>
        <p className='stadium'>{stadium}, Egypt</p>
      </div>
      <div className="price">
        {price} L.E
      </div>
      <div className="buttons">
        <button onClick={() => props.handleTicketsClick('guestView', matchDetails)}>Tickets</button>
        <button className='cancel'>Cancel</button>
      </div>
    </div>
  );

  // Determine which view to render based on props.view
  let view;
  switch (props.view) {
    case 'fanView':
      view = fanView;
      break;
    case 'editView':
      view = editView;
      break;
    case 'reservedView':
      view = reservedView;
      break;
    default:
      view = guestView;
  }

  return view;
};

export default MatchCard;

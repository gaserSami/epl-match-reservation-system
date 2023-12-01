import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MatchCard.css';
import editIcon from '../assets/editing.png';
import { useContext } from 'react';
import MatchCardAndDetailsContext from './MatchCardAndDetailsContext';


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


  const {forceFanPageRender} = props;

  // Format date
  const date = isNaN(Date.parse(matchDate)) ? null : new Date(matchDate);
  const month = date.toLocaleString('default', { month: 'long' });

  // Generate random ticket number
  const ticketNumber = matchDetails && matchDetails.ticketNumber ? matchDetails.ticketNumber : 0;
  // Generate match title
  const title = `${homeTeamName} vs ${awayTeamName}`;

  // Re-render MainPage when forceMainPageRender changes
  useEffect(() => {
    // Your code here...
    console.log('forceMainPageRender');
    console.log('useEffect');
  }, [props.triggerMainPageRender]);

  const cancel = async () => {
    if (ticketNumber !== 0) {
      try {
        // Send a DELETE request to the server
        const response = await axios.delete(`http://localhost:5000/tickets/${ticketNumber}`);

        // Check if the request was successful
        if (response.status === 200) {
          console.log('Ticket cancelled successfully');
        // update the UI here to reflect the cancellation'
        alert('Ticket cancelled successfully');
        if (forceFanPageRender) {
          forceFanPageRender();
        }
        } else {
          console.log('Failed to cancel the ticket');
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  };

  return (
    <div className="matchCard">
      <div className="date">
        <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>{props.view === 'reservedView' ? `#${ticketNumber}` : 'EGYPTIAN PREMIER LEAGUE'}</h2>
        <h1 className='teams'>{title}</h1>
        <span className='time'>{time}</span>
        <p className='stadium'>{stadium}, Egypt</p>
      </div>
      <div className="price">
        {price} L.E
      </div>
      <div className="buttons">
        {props.view !== 'reservedView' && (
          <button onClick={() => props.handleTicketsClick(props.view === 'fanView' ? 'bookView' : 'guestView', matchDetails)}>Tickets</button>
        )}
        {props.view === 'editView' && (
          <button onClick={() => props.handleTicketsClick('editView', matchDetails)}><img src={editIcon} alt="" /></button>
        )}
        {props.view === 'reservedView' && (
          <>
          <button className='cancel' onClick={cancel}>Cancel</button>
          <button onClick={() => props.handleTicketsClick('reservedView', matchDetails)}>view</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchCard;

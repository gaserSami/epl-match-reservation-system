
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MatchCard.css';
import editIcon from '../assets/editing.png';

const MatchCard = (props) => {
   // Function to fetch stadium details based on StadiumID
   const [stadiumDetails, setStadiumDetails] = useState(null);
    const matchDetails = props.matchDetails;

  useEffect(() => {
    const fetchStadiumDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stadiums/${matchDetails.StadiumID}`);
        setStadiumDetails(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchStadiumDetails();
  }, [matchDetails.StadiumID]);

  const date = new Date(matchDetails.MatchDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const time = matchDetails.MatchTime;
  const homeTeam = matchDetails.HomeTeam;
  const awayTeam = matchDetails.AwayTeam;
  const title = homeTeam + ' vs ' + awayTeam;
  // Call the function to get the stadium detail
  const stadium = stadiumDetails ? stadiumDetails.StadiumName : 'Loading...';
  const price = matchDetails.Price;
  const ticketNumber = matchDetails.TicketNumber;

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
     <button onClick={() => props.handleTicketsClick('guestView', matchDetails, stadiumDetails)}>Tickets</button>
      </div>
    </div>
  );

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
      <button onClick={() => props.handleTicketsClick('bookView', matchDetails, stadiumDetails)}>Tickets</button>
      </div>
    </div>
  );

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
      <button onClick={() => props.handleTicketsClick('guestView', matchDetails, stadiumDetails)}>Tickets</button>
        <button onClick={() => props.handleTicketsClick('editView', matchDetails)}><img src={editIcon} alt="" /></button>
      </div>
    </div>
  );

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
      <button onClick={() => props.handleTicketsClick('guestView', matchDetails, stadiumDetails)}>Tickets</button>
        <button className='cancel'>Cancel</button>
      </div>
    </div>
  );

  switch (props.view) {
    case 'fanView':
      return fanView;
    case 'editView':
      return editView;
    case 'reservedView':
      return reservedView;
    default:
      return guestView;
  }
};

export default MatchCard;

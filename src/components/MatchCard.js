import React from 'react';
import '../styles/MatchCard.css';
import editIcon from '../assets/editing.png';

const MatchCard = (props) => {

  const matchDetails = props.matchDetails;
  const date = new Date(matchDetails.date);
  const month = date.toLocaleString('default', { month: 'long' });
  const time = matchDetails.time;
  const homeTeam = matchDetails.homeTeam;
  const awayTeam = matchDetails.awayTeam;
  const title = homeTeam + ' vs ' + awayTeam;
  const stadium = matchDetails.stadium;
  const price = matchDetails.price;
  const ticketNumber = matchDetails.ticketNumber;

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
        {price} L.E L.E
      </div>
      <div className="buttons">
     <button onClick={() => props.handleTicketsClick('guestView', matchDetails)}>Tickets</button>
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
      <button onClick={() => props.handleTicketsClick('bookView', matchDetails)}>Tickets</button>
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
      <button onClick={() => props.handleTicketsClick('guestView', matchDetails)}>Tickets</button>
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
     <button onClick={() => props.handleTicketsClick('reservedView', matchDetails)}>Tickets</button>
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

import React from 'react';
import '../styles/MatchCard.css';

const MatchCard = (props) => {
  return (
    <div className="matchCard">
      <div className="date">
        <span className="month">Nov</span>
        <span className="day">25</span>
        <span className="year">2023</span>
      </div>
      <div className="info">
        <h2>EGYPTIAN PREMIER LEAGUE</h2>
        <h1 className='teams'>AL AHLY V EL GOUNA</h1>
        <span className='time'>12:30</span>
        <p className='stadium'>Cairo Stadium,Cairo, Egypt</p>
      </div>
      <div className="price">
        69.99L.E
      </div>
      <div className="buttons">
        <button>Tickets</button>
      </div>
    </div>
  );
};

export default MatchCard;

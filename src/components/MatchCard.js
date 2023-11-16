import React from 'react';
import '../styles/MatchCard.css';
import editIcon from '../assets/editing.png';

const MatchCard = (props) => {
  const guestView = <div className="matchCard">
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
    <button className='disabled'>Tickets</button>
  </div>
</div>;
const fanView = <div className="matchCard">
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
</div>;
const editView = <div className="matchCard">
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
  <button><img src={editIcon} alt="" /></button>
</div>
</div>;
const reservedView = <div className="matchCard">
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
  <button className='cancel'>Cancel</button>
</div>
</div>;
  return (
    editView
  );
};

export default MatchCard;

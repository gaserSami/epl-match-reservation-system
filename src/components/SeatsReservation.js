import React, { useState } from 'react';
import '../styles/SeatsReservation.css';

const SeatsReservation = (props) => {
  const rows = props.rows;
  const cols = props.cols;
  const [seats, setSeats] = useState(() => {
    const initialSeats = Array.from({length: rows}, () => Array(cols).fill('vacant'));
    // Reserve some seats for testing
    initialSeats[0][0] = 'reserved'; // Reserve the seat at row 0, column 0
    initialSeats[0][1] = 'reserved'; // Reserve the seat at row 0, column 1
    initialSeats[1][0] = 'reserved'; // Reserve the seat at row 1, column 0
    return initialSeats;
  });
  const [mySeats, setMySeats] = useState([]);

  const handleSeatClick = (row, col) => {
    if(props.disabled) return;
    if (seats[row][col] === 'vacant') {
      const updatedSeats = [...seats];
      updatedSeats[row] = [...updatedSeats[row]];
      updatedSeats[row][col] = 'reserved';
      setSeats(updatedSeats);
      setMySeats([...mySeats, {row, col}]);
    } else {
      alert('This seat is already reserved.');
    }
  };

  const isMySeat = (row, col) => {
    return mySeats.some(seat => seat.row === row && seat.col === col);
  };

  return (
    <div className={`seats-container ${props.disabled ? 'disabled' : ''}`}>
      {seats.map((row, i) => (
        <div key={i} className="seat-row">
          {row.map((seat, j) => (
            <button 
              key={j} 
              onClick={() => handleSeatClick(i, j)} 
              title={seat} 
              className={`seat ${seat === 'vacant' ? 'vacant' : seat === 'reserved' && isMySeat(i, j) ? 'mine' : 'reserved'}`}
            >
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatsReservation;
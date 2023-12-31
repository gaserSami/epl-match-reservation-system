/*
  This component is responsible for displaying the seats of a match and allowing the user to reserve seats.
  It is used to display the seats of a match and allow the user to reserve seats.
*/

// importing dependencies
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// importing styles
import '../styles/SeatsReservation.css';
// importing context
import ReservationContext from './ReservationContext';
import LoadingContext from "./LoadingContext";
import { set } from 'mongoose';


// Define SeatsReservation component
const SeatsReservation = (props) => {
  const { rows, cols, matchID, disabled } = props;
  const [seats, setSeats] = useState(() => 
    Array.from({ length: rows }, () => Array(cols).fill('vacant'))
  );
  const [mySeats, setMySeats] = useState([]); // [{ row, col }
  const { setMySeatsNumber } = useContext(ReservationContext);
  const { UserIDD } = useContext(ReservationContext);
  const [isLoading, setIsLoading] = useState(true);
  const { setOverlayLoading } = useContext(LoadingContext);

useEffect(() => {
  setOverlayLoading(true);
    setMySeatsNumber([]);
    const timer = setTimeout(() => {
    setIsLoading(false);
    setOverlayLoading(false);
  }, 1500);
   return () => clearTimeout(timer);
}, []);

// Fetch seats from the server
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets?MatchID=${matchID}`);
        const ticketsForMatch = response.data.filter(ticket => ticket.MatchID._id === matchID);
        const myTickets = ticketsForMatch.filter(ticket => ticket.UserID._id === UserIDD);
        const notMyTickets = ticketsForMatch.filter(ticket => ticket.UserID._id !== UserIDD);
        
        const newSeats = Array.from({ length: rows }, () => Array(cols).fill('vacant'));
        
        notMyTickets.forEach(ticket => {
          ticket.SeatsNumber.forEach(seatNumber => {
            const rowIndex = Math.floor((seatNumber - 1) / cols);
            const colIndex = (seatNumber - 1) % cols;
            newSeats[rowIndex][colIndex] = 'reserved';
          });
        });

        myTickets.forEach(ticket => {
          ticket.SeatsNumber.forEach(seatNumber => {
            const rowIndex = Math.floor((seatNumber - 1) / cols);
            const colIndex = (seatNumber - 1) % cols;
            newSeats[rowIndex][colIndex] = 'mine';
          });
        });

       // Override locally reserved seats if they have been reserved by others
        mySeats.forEach(seat => {
          if (newSeats[seat.row][seat.col] === 'reserved') {
            // Calculate the seat index
            const seatIndex = seat.row * cols + seat.col + 1;

            // Update mySeatsNumbers to remove the seat number
            setMySeatsNumber(prevMySeatNumbers => 
              prevMySeatNumbers.filter(number => number !== seatIndex)
            );

          
            // Update mySeats to remove the seat
            setMySeats(prevMySeats => 
              prevMySeats.filter(s => s.row !== seat.row || s.col !== seat.col)
            );

            // Update seats to reflect the new state
            setSeats(prevSeats => {
              const updatedSeats = [...prevSeats];
              updatedSeats[seat.row][seat.col] = 'reserved';
              return updatedSeats;
            });
          }
        });


        setSeats(newSeats);
       
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };
    // Fetch seats initially
    fetchSeats();
    // Fetch seats every one second
    const interval = setInterval(fetchSeats, 1000);
    return () => clearInterval(interval);
  }, [matchID, rows, cols]);


  // Event handler for seat clicks
  const handleSeatClick = (row, col) => {
    if (disabled) return;

    const seatIndex = row * cols + col + 1; // Calculate the seat index based on row and col

    if (seats[row][col] === 'vacant') {
      // Reserve the seat locally
      setSeats(prevSeats => {
        const updatedSeats = [...prevSeats];
        updatedSeats[row][col] = 'mine';
        return updatedSeats;
      });
      setMySeats(prevMySeats => [...prevMySeats, { row, col }]);
      setMySeatsNumber(prevMySeatNumbers => [...prevMySeatNumbers, seatIndex]);
    } else if (seats[row][col] === 'mine') {
      // Cancel the seat reservation locally
      setSeats(prevSeats => {
        const updatedSeats = [...prevSeats];
        updatedSeats[row][col] = 'vacant';
        return updatedSeats;
      });
      setMySeats(prevMySeats => prevMySeats.filter(seat => seat.row !== row || seat.col !== col));
      setMySeatsNumber(prevMySeatNumbers => prevMySeatNumbers.filter(index => index !== seatIndex));

    } else {
      alert('This seat is already reserved.');
    }
  };

  const isMySeat = (row, col) => {
    return mySeats.some(seat => seat.row === row && seat.col === col);
  };


  return (
    isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className={`seats-container ${disabled ? 'disabled' : ''}`}>
        {seats.map((rowSeats, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {rowSeats.map((seatStatus, colIndex) => (
              <button 
                key={colIndex} 
                onClick={() => handleSeatClick(rowIndex, colIndex)} 
                title={seatStatus} 
                className={`seat ${seatStatus} ${isMySeat(rowIndex, colIndex) ? 'mine' : ''}`}
                disabled={disabled}
              />
            ))}
          </div>
        ))}
      </div>
    )
  );
            };

export default SeatsReservation;

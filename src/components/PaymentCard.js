import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/PaymentCard.css';
import ReservationContext from './ReservationContext';

const PaymentCard = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const {mySeatsNumber , Pricee, MatchIDD, UserIDD} = useContext(ReservationContext);

  const validateFields = () => {
    const cardNumberPattern = /^\d{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvPattern = /^\d{3}$/;
    return cardNumberPattern.test(cardNumber) && expiryDatePattern.test(expiryDate) && cvvPattern.test(cvv);
  };

const isMatchClashing = async (UserIDD, MatchIDD) => {
  try {
    // Fetch all tickets reserved by the user
    const userTicketsResponse = await axios.get(`http://localhost:5000/tickets`);
    let allTickets = userTicketsResponse.data;

    // Filter tickets reserved by the user
    const userTickets = allTickets.filter(ticket => ticket.UserID._id === UserIDD);

    // Fetch the match data for the current match
    const currentMatchResponse = await axios.get(`http://localhost:5000/matches/${MatchIDD}`);
    const currentMatch = currentMatchResponse.data;

     // Check if the current match clashes with any of the matches the user has tickets for
     for (let ticket of userTickets) {
      // Fetch the match data for the ticket
      const ticketMatchResponse = await axios.get(`http://localhost:5000/matches/${ticket.MatchID._id}`);
      const ticketMatch = ticketMatchResponse.data;

      // Check if the match dates are the same
      const currentMatchDate = new Date(currentMatch.MatchDate);
      const ticketMatchDate = new Date(ticketMatch.MatchDate);

      

      if (currentMatchDate.toDateString() === ticketMatchDate.toDateString()) {
        // If the match dates are the same, check if the match times overlap
        const currentMatchTime = new Date(`1970-01-01T${currentMatch.MatchTime}:00Z`);
        const ticketMatchTime = new Date(`1970-01-01T${ticketMatch.MatchTime}:00Z`);

        const matchDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds

        if ((currentMatchTime.getTime() < ticketMatchTime.getTime() + matchDuration) && (currentMatchTime.getTime() + matchDuration > ticketMatchTime.getTime())) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error while checking for clashing matches:", error);
    return false;
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("enter valid info");
    return;}
       // Define the ticket object here with the relevant data
    const ticket = {
      MatchID: MatchIDD, // Make sure this variable is defined and holds the correct match ID
      UserID: UserIDD, // Replace with the actual user ID
      SeatsNumber: mySeatsNumber, // This should be an array of seat numbers the user wants to reserve
      Price: Pricee * mySeatsNumber.length, // Replace with the actual price
    };
      // Fetch all tickets for this match to check if seats are already reserved
      axios.get(`http://localhost:5000/tickets`)
        .then(response => {
          const allTickets = response.data;
          // Filter tickets for the specific match ID
          const ticketsForMatch = allTickets.filter(ticket => ticket.MatchID._id === MatchIDD);
          
          // Flatten all seat numbers reserved in these tickets into a single array
          const allReservedSeats = ticketsForMatch.reduce((acc, ticket) => {
            return acc.concat(ticket.SeatsNumber);
          }, []);

          // Check if any seat the user wants to reserve is already reserved
          const isAnySeatReserved = mySeatsNumber.some(seat => allReservedSeats.includes(seat));
          if (isAnySeatReserved) {
            alert("One or more selected seats are already reserved. Please choose other seats.");
            props.handleBookTicket(0);
            return;
            // Stop the submit as seats are already reserved
          } else {
              const checkClashing = async () => {
                const result = await isMatchClashing(UserIDD, MatchIDD);
                if (result) {
                  // Handle the case where the matches are clashing
                  alert("this match is clashing with another match cancel the old match reservation and try again.");
                  props.handleBookTicket(0);
                  return;
                } else {
                  // Handle the case where the matches are not clashing
                  // If all the seats are vacant, proceed to submit
                    axios.post('http://localhost:5000/tickets', ticket)
                    .then(() => {
                      props.handleBookTicket(1);
                      props.forceFanPageRender();
                    })
                    .catch(error => {
                      console.error("Error while booking ticket:", error);
                      props.handleBookTicket(0);
                    });
                }
              }
              checkClashing();
        }
        })
    }

  return (
    <div className='payment-card-container'>
      <div className="ticket-details">
        <p><b>Seats Number</b>: {mySeatsNumber.join(', ')}</p>
        <p><b>Total Price</b>: {Pricee * mySeatsNumber.length}</p>
      </div>
      <form className="payment-card" onSubmit={handleSubmit}>
        <input type="text" placeholder="Card Number: 1234567812345678 " value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        <input type="text" placeholder="Expiry Date: 12/25" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required/>
        <input type="text" placeholder="CVV: 123" value={cvv} onChange={(e) => setCvv(e.target.value)} required/>
        <input type="text" placeholder="Card Holder Name: Example" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required/>
        <button type="submit">Confirm Payment</button>
      </form> 
    </div>
  );
};

export default PaymentCard;
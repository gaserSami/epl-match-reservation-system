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

  console.log("payment card");
  console.log(mySeatsNumber);
  console.log(Pricee);
  console.log(MatchIDD);
  console.log(UserIDD);

  const validateFields = () => {
    const cardNumberPattern = /^\d{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const cvvPattern = /^\d{3}$/;

    return cardNumberPattern.test(cardNumber) && expiryDatePattern.test(expiryDate) && cvvPattern.test(cvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
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
            return acc.concat(ticket.mySeatsNumber);
          }, []);
  
          // Check if any seat the user wants to reserve is already reserved
          const isAnySeatReserved = mySeatsNumber.some(seat => allReservedSeats.includes(seat));
  
          if (isAnySeatReserved) {
            alert("One or more selected seats are already reserved. Please choose other seats.");
            props.handleBookTicket(0);
            // Stop the submit as seats are already reserved
          } else {
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
        })
        .catch(error => {
          console.error("Error while fetching tickets:", error);
        });
    } else {
      alert('Please enter valid payment details!');
    }
  };
  

  return (
    <div className='payment-card-container'>
      <div className="ticket-details">
        <p><b>Seats Number</b>: {mySeatsNumber.join(', ')}</p>
        <p><b>Total Price</b>: {Pricee * mySeatsNumber.length}</p>
      </div>
      <form className="payment-card" onSubmit={handleSubmit}>
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required/>
        <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required/>
        <input type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required/>
        <button type="submit">Confirm Payment</button>
      </form> 
    </div>
  );
};

export default PaymentCard;
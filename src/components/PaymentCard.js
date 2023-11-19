import React, { useState } from 'react';
import '../styles/PaymentCard.css';

const PaymentCard = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
  };

  return (
    <form className="payment-card" onSubmit={handleSubmit}>
      <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
      <input type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
      <button type="submit" onClick={() => props.handleBookTicket(0)}>Confirm Payment</button>
    </form>
  );
};

export default PaymentCard;
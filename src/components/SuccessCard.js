import React from 'react';
import '../styles/SuccessCard.css';

const SuccessCard = ({ message }) => {
  return (
    <div className="success-card">
      <div className="checkmark">✔</div>
      <h2 className="title">Completed Successfully</h2>
      <p className="message">{message}</p>
    </div>
  );
};

export default SuccessCard;
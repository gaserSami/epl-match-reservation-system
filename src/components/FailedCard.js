import React from 'react';
import '../styles/FailedCard.css';

const FailedCard = ({ message }) => {
  return (
    <div className="failed-card">
      <div className="crossmark">✖</div>
      <h2 className="title">Failed</h2>
      <p className="message">{message}</p>
    </div>
  );
};

export default FailedCard;
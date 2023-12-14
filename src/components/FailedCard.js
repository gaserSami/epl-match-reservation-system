/*
  This component is used to display a failed card.
  It takes a message as a prop.
 */

// importing dependencies
import React from "react";
// importing styles
import "../styles/FailedCard.css";

// component
const FailedCard = ({ message }) => {
  return (
    <div className="failed-card">
      <div className="crossmark">✖</div>
      <h2 className="title">Failed</h2>
      <p className="message">{message}</p>
    </div>
  );
};

// export component
export default FailedCard;

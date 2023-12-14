/*
  This component is used to display a success message to the user.
*/

// importing dependencies
import React from "react";
// importing styles
import "../styles/SuccessCard.css";

// Define SuccessCard component
const SuccessCard = ({ message }) => {
  return (
    <div className="success-card">
      <div className="checkmark">✔</div>
      <h2 className="title">Completed Successfully</h2>
      <p className="message">{message}</p>
    </div>
  );
};

// Export SuccessCard component
export default SuccessCard;

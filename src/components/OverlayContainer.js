/*
  This component is a container for the overlay. It is used to display the overlay
  on top of the main page.
*/
// importing dependencies
import React from "react";
// importing styles
import "../styles/OverlayContainer.css";

// Define OverlayContainer component
const OverlayContainer = ({ children, onClose }) => {
  return (
    <div className="overlay">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {children}
    </div>
  );
};

// Export OverlayContainer component
export default OverlayContainer;

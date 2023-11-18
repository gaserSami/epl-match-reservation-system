// OverlayContainer.js
import React from 'react';
import '../styles/OverlayContainer.css';

const OverlayContainer = ({ children, onClose }) => {
  return (
    <div className="overlay">
      <button className="close-button" onClick={onClose}>X</button>
      {children}
    </div>
  );
};

export default OverlayContainer;
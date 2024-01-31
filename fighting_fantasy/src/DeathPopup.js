import React from 'react';
import './DeathPopup.css';

const DeathPopup = () => {
    const handleClose = () => {
        // Redirect to the homepage
        window.location.href = '/';
      };
    
  
    return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>You have died!</h2>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default DeathPopup;
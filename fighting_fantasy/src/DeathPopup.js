import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeathPopup.css';

const DeathPopup = () => {
  const navigate = useNavigate();
    const handleClose = () => {
        // Redirect to the homepage
        navigate('/');
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
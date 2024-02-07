import React, { useState } from 'react';

const StaminaSection = ({ stamina, setStamina, originalStamina, setOriginalStamina, initialStaminalInputDone, setInitialStaminaInputDone }) => {

    const handleIncrease = () => {
        setStamina(stamina + 1);
    };

    const handleDecrease = () => {
        setStamina(stamina - 1);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setOriginalStamina(isNaN(value) ? 0 : value);
    };

    const handleInputSubmit = () => {
        setInitialStaminaInputDone(true);
        setStamina(originalStamina); // Set current stamina to original stamina initially
    };

    return (
        <div>
        {!initialStaminalInputDone && (
            <div>
            <label>
                Original Stamina: 
                <input
                type="number"
                value={originalStamina}
                onChange={(e) => handleInputChange(e)}
                />
            </label>
            <button onClick={handleInputSubmit}>Submit Initial Stamina</button>
            </div>
        )}
        {initialStaminalInputDone && (
            <div>
            <h3>Current Stamina: {stamina}</h3>
            <p>Stamina Level: {originalStamina}</p>
            <button onClick={handleIncrease} disabled={stamina === originalStamina}>Increase Stamina</button>
            <button onClick={handleDecrease} disabled={stamina === 0}>Decrease Stamina</button>
            </div>
        )}
        </div>
    );
};

export default StaminaSection;

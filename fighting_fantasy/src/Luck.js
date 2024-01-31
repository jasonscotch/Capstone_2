import React, { useState } from 'react';

const LuckSection = ({ luck, setLuck, originalLuck, setOriginalLuck }) => {
  const [initialInputDone, setInitialInputDone] = useState(false);

  const handleIncrease = () => {
    setLuck(luck + 1);
  };

  const handleDecrease = () => {
    setLuck(luck - 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setOriginalLuck(isNaN(value) ? 0 : value);
  };

  const handleInputSubmit = () => {
    setInitialInputDone(true);
    setLuck(originalLuck);
  };

  return (
    <div>
      {!initialInputDone && (
        <div>
          <label>
            Original Luck: 
            <input
              type="number"
              value={originalLuck}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleInputSubmit}>Submit Initial Luck</button>
        </div>
      )}
      {initialInputDone && (
        <div>
          <h3>Current Luck: {luck}</h3>
          <p>Luck Level: {originalLuck}</p>
          <button onClick={handleIncrease} disabled={luck === originalLuck}>Increase Luck</button>
          <button onClick={handleDecrease} disabled={luck === 0}>Decrease Luck</button>
        </div>
      )}
    </div>
  );
};

export default LuckSection;

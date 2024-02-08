import React, { useState } from 'react';

const LuckSection = ({ luck, setLuck, originalLuck, setOriginalLuck, initialLuckInputDone, setInitialLuckInputDone }) => {

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
    setInitialLuckInputDone(true);
    setLuck(originalLuck);
  };

  return (
    <div className='rpgui-container framed-golden'>
      {!initialLuckInputDone && (
        <div className='main-game-stats'>
          <label>
           Luck: 
            <input
              type="number"
              value={originalLuck}
              onChange={handleInputChange}
            /><button onClick={handleInputSubmit}> > </button>
          </label>
          
        </div>
      )}
      {initialLuckInputDone && (
        <div className='main-game-stats-2'>
          <h2>Luck</h2>
          <h1>{luck}</h1>
          {/* <br></br>
          <h4>Original Luck: {originalLuck}</h4> */}
          <div>
            <button onClick={handleDecrease} disabled={luck === 0}>-</button>
            <button onClick={handleIncrease} disabled={luck === originalLuck}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckSection;

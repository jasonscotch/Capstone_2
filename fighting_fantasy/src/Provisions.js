import React, { useState } from 'react';

const Provisions = ({ originalStamina, stamina, setStamina, remainingProvisions, setRemainingProvisions }) => {

  const handleUseProvision = () => {
    if (remainingProvisions > 0) {
      // Calculate the points to add, considering not exceeding the original stamina
      const pointsToAdd = Math.min(4, originalStamina - stamina);
      
      // Update stamina and remaining provisions
      setStamina((prevStamina) => Math.min(originalStamina, prevStamina + pointsToAdd));
      setRemainingProvisions((prevProvisions) => Math.max(0, prevProvisions - 1));
    }
  };

  return (
    <div className='rpgui-container framed'>
      <div className='main-game-stats-2'>
      <h2>Provisions</h2>
      <h1>{remainingProvisions}</h1>
      <br></br>
      <button onClick={handleUseProvision} disabled={stamina === originalStamina}>Use Provision</button>
    </div>
    </div>
  );
};

export default Provisions;

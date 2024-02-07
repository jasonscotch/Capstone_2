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
    <div>
      <h3>Provisions</h3>
      <p>Remaining: {remainingProvisions}</p>
      <button onClick={handleUseProvision} disabled={stamina === originalStamina}>Use Provision</button>
    </div>
  );
};

export default Provisions;

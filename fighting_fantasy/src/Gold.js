import React from 'react';

const GoldSection = ({ gold, setGold }) => {
  
  const handleIncrease = () => {
    setGold(gold + 1);
  };

  const handleDecrease = () => {
    if (gold > 0) {
      setGold(gold - 1);
    }
  };

  return (
    <div>
      <h3>Current Gold: {gold}</h3>
      <button onClick={handleIncrease}>Increase Gold</button>
      <button onClick={handleDecrease}>Decrease Gold</button>
    </div>
  );
};

export default GoldSection;

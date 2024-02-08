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
    <div className='rpgui-container framed'>
      <div className='main-game-stats-2'>
        <h2>Gold</h2>
        <h1>{gold}</h1>
        <br></br>
        <div>
          <button onClick={handleDecrease}> - </button>
          <button onClick={handleIncrease}> + </button>
        </div>
      </div>
    </div>
  );
};

export default GoldSection;

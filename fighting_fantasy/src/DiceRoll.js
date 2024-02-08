import React, { useState } from 'react';
import './DiceRoll.css';

const DiceRoll = ( { diceResult, setDiceResult }) => {
  

  const rollSingleDie = () => {
    const die = document.querySelector(".die-list");
    toggleClasses(die);
    const roll = getRandomNumber(1, 6);
    die.dataset.roll = roll;
    setTimeout(() => setDiceResult(roll), 1500);
  };

  const rollBothDice = () => {
    const dice = document.querySelectorAll(".die-list");
    let total = 0;

    dice.forEach(die => {
      toggleClasses(die);
      const roll = getRandomNumber(1, 6);
      die.dataset.roll = roll;
      total += roll;
    });

    setTimeout(() => setDiceResult(total), 1500);
  };

  const toggleClasses = (die) => {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className='main-game-3'>
      <h4>Result: {diceResult !== null ? diceResult : 'Roll the dice'}</h4>
      <div className="dice">
        <ol className="die-list even-roll" data-roll="1" id="die-1">
            <li className="die-item" data-side="1">
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
        </ol>
        <ol className="die-list odd-roll" data-roll="1" id="die-2">
        <li className="die-item" data-side="1">
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </li>
        </ol>
      </div>
      <div className='main-game-stats'>
        <button onClick={rollSingleDie}>Roll One</button>
        <button onClick={rollBothDice}>Roll Both</button>
      </div>
      
    </div>
  );
};

export default DiceRoll;

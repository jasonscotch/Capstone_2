import React, { useState } from 'react';
import './DeathPopup.css';

const EnemyPopup = ({ playerStamina, enemyStats, combatRound, onFight, onClose }) => {
    return (
        <div className="popup-container">
        <div className="popup-content">
          <h2>Fight Round: {combatRound}</h2>
          <p>Player Stamina: {playerStamina}</p>
          {/* Display enemy stats */}
          {enemyStats.map((enemy) => (
            <div key={enemy.monster_id}>
              <h3>
                {enemy.monster_name}&emsp;&emsp;&emsp;&emsp;Skill: {enemy.skill}&emsp;&emsp;Stamina: {enemy.stamina}
              </h3>
            </div>
          ))}
          <button onClick={onFight}>Fight</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
};

export default EnemyPopup;
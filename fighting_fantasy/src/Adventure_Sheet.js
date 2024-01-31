import React, { useState, useEffect } from 'react';

import StaminaSection from './Stamina';
import SkillSection from './Skill';
import LuckSection from './Luck';
import DiceRoll from './DiceRoll';
import Inventory from './Inventory';
import GoldSection from './Gold';
import Provisions from './Provisions';

const AdventureSheet = ({ characterName, inventoryItems, setInventoryItems, gold, setGold, stamina, setStamina, originalStamina, setOriginalStamina, skill, setSkill, originalSkill, setOriginalSkill, luck, setLuck, originalLuck, setOriginalLuck, diceResult, setDiceResult }) => {

  useEffect(() => {
    // Save data to the database on each update
    saveAdventureSheetData();
  }, [stamina, skill, luck, gold, originalStamina, inventoryItems ]); 
  const saveAdventureSheetData = () => {
    // Implement logic to save data to the database
    // You can use fetch or axios to make a POST request to your API endpoint
  };

  return (
    <div>
      <h2>Adventure Sheet - {characterName}</h2>
      <StaminaSection 
        stamina={stamina} 
        setStamina={setStamina} 
        originalStamina={originalStamina}
        setOriginalStamina={setOriginalStamina} 
      />
      <SkillSection 
        skill={skill} 
        setSkill={setSkill}
        originalSkill={originalSkill}
        setOriginalSkill={setOriginalSkill} 
      />
      <LuckSection 
        luck={luck} 
        setLuck={setLuck} 
        originalLuck={originalLuck}
        setOriginalLuck={setOriginalLuck}
      />
      <DiceRoll 
        diceResult={diceResult}
        setDiceResult={setDiceResult}
      />
      <Inventory 
        inventoryItems={inventoryItems} 
        setInventoryItems={setInventoryItems} 
      />
      <GoldSection 
        gold={gold} 
        setGold={setGold} 
      />
      <Provisions 
        originalStamina={originalStamina}
        stamina={stamina}
        setStamina={setStamina} 
      />
    </div>
  );
};

export default AdventureSheet;

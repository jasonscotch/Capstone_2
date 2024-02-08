import React, { useState, useEffect } from 'react';

import StaminaSection from './Stamina';
import SkillSection from './Skill';
import LuckSection from './Luck';
import DiceRoll from './DiceRoll';
import Inventory from './Inventory';
import GoldSection from './Gold';
import Provisions from './Provisions';
import { useGame } from "./GameContext";
import { useAuth } from "./AuthContext";
import character from './ezgif.com-crop.gif';

const AdventureSheet = () => {

  const {
    loadId,
    setLoadId,
    inventoryItems,
    setInventoryItems,
    gold,
    setGold,
    stamina,
    setStamina,
    originalStamina,
    setOriginalStamina,
    skill,
    setSkill,
    originalSkill,
    setOriginalSkill,
    luck,
    setLuck,
    originalLuck,
    setOriginalLuck,
    enemies,
    setEnemies,
    diceResult,
    setDiceResult,
    combatRound,
    setCombatRound,
    inCombat,
    setInCombat,
    remainingProvisions,
    setRemainingProvisions,
    initialLuckInputDone,
    setInitialLuckInputDone,
    initialSkillInputDone,
    setInitialSkillInputDone,
    initialStaminalInputDone,
    setInitialStaminaInputDone,
  } = useGame();
  const { user } = useAuth();

  return (
    <div style={{width: '40%'}}>
    <div className='rpgui-container framed-golden-2'>
      <h2>Adventure Sheet - {user.username}</h2>
      
      <div className='main-game'>
        <SkillSection 
          skill={skill} 
          setSkill={setSkill}
          originalSkill={originalSkill}
          setOriginalSkill={setOriginalSkill}
          setInitialSkillInputDone={setInitialSkillInputDone}
          initialSkillInputDone={initialSkillInputDone} 
        />
        <StaminaSection 
          stamina={stamina} 
          setStamina={setStamina} 
          originalStamina={originalStamina}
          setOriginalStamina={setOriginalStamina} 
          setInitialStaminaInputDone={setInitialStaminaInputDone}
          initialStaminalInputDone={initialStaminalInputDone}
        />
        {/* <div class="rpgui-icon potion-red"></div> */}
        <LuckSection 
          luck={luck} 
          setLuck={setLuck} 
          originalLuck={originalLuck}
          setOriginalLuck={setOriginalLuck}
          setInitialLuckInputDone={setInitialLuckInputDone}
          initialLuckInputDone={initialLuckInputDone}
        />
        
      </div>
      <div className='rpgui-container framed'>
      <DiceRoll 
        diceResult={diceResult}
        setDiceResult={setDiceResult}
      />
      </div>
      <div className='rpgui-container framed-golden'>
        <Inventory 
          inventoryItems={inventoryItems} 
          setInventoryItems={setInventoryItems} 
        />
      </div>
      <div className='main-game-stats'>
        <div className='rpgui-container framed-2'>
          <div className='gif'>
            <img src={character} alt='Character'/>
          </div>
        </div>
        <GoldSection 
          gold={gold} 
          setGold={setGold} 
        />
        
        <Provisions 
          originalStamina={originalStamina}
          stamina={stamina}
          setStamina={setStamina} 
          remainingProvisions={remainingProvisions}
          setRemainingProvisions={setRemainingProvisions}
        />
      </div>
    </div>
    </div>
  );
};

export default AdventureSheet;

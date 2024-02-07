import React, { useEffect, useState } from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Book from "./Book.js";
import AdventureSheet from "./AdventureSheet.js";


function Game({ loadId, setLoadId }) {
  const [inventoryItems, setInventoryItems] = useState([{item_name: 'Map', effect_name: 'Just a map'}]);
  const [gold, setGold] = useState(50);
  const [stamina, setStamina] = useState(1);
  const [originalStamina, setOriginalStamina] = useState('');
  const [skill, setSkill] = useState(1);
  const [originalSkill, setOriginalSkill] = useState('');
  const [luck, setLuck] = useState(1);
  const [originalLuck, setOriginalLuck] = useState('');
  const [enemies, setEnemies] = useState([]);
  const [diceResult, setDiceResult] = useState(null);
  const [combatRound, setCombatRound] = useState(0);
  const [inCombat, setInCombat] = useState(false);
  const [remainingProvisions, setRemainingProvisions] = useState(10);
  const [initialLuckInputDone, setInitialLuckInputDone] = useState(false);
  const [initialSkillInputDone, setInitialSkillInputDone] = useState(false);
  const [initialStaminalInputDone, setInitialStaminaInputDone] = useState(false);
  

  useEffect(() => {
    if (stamina <= 0) {
      window.location.href = '/death';
    }
  }, [stamina]);
  
  return (
    <div>   
          <Header />
          <Book 
            inventoryItems={inventoryItems} 
            setInventoryItems={setInventoryItems} 
            gold={gold}
            setGold={setGold}
            stamina={stamina}
            setStamina={setStamina}
            originalStamina={originalStamina}
            setOriginalStamina={setOriginalStamina}
            skill={skill}
            setSkill={setSkill}
            originalSkill={originalSkill}
            setOriginalSkill={setOriginalSkill}
            luck={luck}
            setLuck={setLuck}
            originalLuck={originalLuck}
            setOriginalLuck={setOriginalLuck}
            enemies={enemies}
            setEnemies={setEnemies}
            diceResult={diceResult}
            setDiceResult={setDiceResult}
            combatRound={combatRound}
            setCombatRound={setCombatRound}
            inCombat={inCombat}
            setInCombat={setInCombat}
            remainingProvisions={remainingProvisions}
            setRemainingProvisions={setRemainingProvisions}
            setInitialLuckInputDone={setInitialLuckInputDone}
            setInitialSkillInputDone={setInitialSkillInputDone}
            setInitialStaminaInputDone={setInitialStaminaInputDone}
            loadId={loadId}
            setLoadId={setLoadId}
          />
          <AdventureSheet 
            characterName={'Test Name'} 
            inventoryItems={inventoryItems} 
            setInventoryItems={setInventoryItems} 
            gold={gold}
            setGold={setGold}
            stamina={stamina}
            setStamina={setStamina}
            originalStamina={originalStamina}
            setOriginalStamina={setOriginalStamina}
            skill={skill}
            setSkill={setSkill}
            originalSkill={originalSkill}
            setOriginalSkill={setOriginalSkill}
            luck={luck}
            setLuck={setLuck}
            originalLuck={originalLuck}
            setOriginalLuck={setOriginalLuck}
            diceResult={diceResult}
            setDiceResult={setDiceResult}
            remainingProvisions={remainingProvisions}
            setRemainingProvisions={setRemainingProvisions}
            setInitialLuckInputDone={setInitialLuckInputDone}
            setInitialSkillInputDone={setInitialSkillInputDone}
            setInitialStaminaInputDone={setInitialStaminaInputDone}
            initialLuckInputDone={initialLuckInputDone}
            initialSkillInputDone={initialSkillInputDone}
            initialStaminalInputDone={initialStaminalInputDone}
          />
          <Footer />
    </div>   
  );
}

export default Game;

import React, { useEffect } from 'react';
import SaveProgress from "./SaveProgress";
import DeleteProgress from './DeleteProgress';
import { useGame } from "./GameContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


const Book = () => {

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
    // diceResult,
    // setDiceResult,
    combatRound,
    setCombatRound,
    inCombat,
    setInCombat,
    remainingProvisions,
    setRemainingProvisions,
    // initialLuckInputDone,
    setInitialLuckInputDone,
    // initialSkillInputDone,
    setInitialSkillInputDone,
    // initialStaminalInputDone,
    setInitialStaminaInputDone,
    data,
    setData,
    items,
    setItems,
    itemsAvailable,
    setItemsAvailable,
    disabledButtons,
    setDisabledButtons,
    showCombatResults,
    setShowCombatResults,
    fightButton,
    setFightButton,
    matchingItems,
    setMatchingItems, 
    LoadSavedGame,
    fetchData, 
    progressId

  } = useGame();

  const { user } = useAuth();
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const handleLoadGame = async () => { 
    await LoadSavedGame(); 
  };

  const areThereItems = () => {
    if (items.length >= 1) {
      setItemsAvailable(true);
    } else {
      setItemsAvailable(false);
    }
  };

  useEffect(() => {
    areThereItems();
    
  }, [items]);
  

  const handleButtonClick = async (choiceNumber) => {
    const chapterId = data[`choice_${choiceNumber}`];
    if (chapterId) {
      await fetchData(chapterId);
    }
  };

  const renderChoiceButton = (choiceNumber) => {
    const choiceValue = data[`choice_${choiceNumber}`];
    return (
      choiceValue && (
        <button 
          key={choiceNumber}
          disabled={inCombat} 
          className="rpgui-button"
          onClick={() => handleButtonClick(choiceNumber)} 
        >
          <p>Turn to {choiceValue}</p>
        </button>
      )
    );
  };

  // Buying and Taking Items in chapter
  const handleTakeItem = (itemId) => {
    // Find the item in the items array
    const takenItem = items.find(item => item.item_id === itemId);

    // Update inventory only if the item is found and its cost is 0
    if (takenItem && takenItem.cost === 0) {

      setInventoryItems([...inventoryItems, takenItem]);
      setDisabledButtons([...disabledButtons, takenItem.item_id]);
    }
  };

  const handleBuyItem = (itemId) => {
    // Find the item in the items array
    const boughtItem = items.find(item => item.item_id === itemId);

    // Update inventory only if the item is found, its cost is greater than 0, and you have enough gold
    if (boughtItem && boughtItem.cost > 0 && boughtItem.cost <= gold) {

      setInventoryItems([...inventoryItems, boughtItem]);
      setDisabledButtons([...disabledButtons, boughtItem.item_id]);
      // Deduct gold from the character
      setGold(gold - boughtItem.cost);
    }
  };

  const renderItems = () => {
    // Check if there are any items and if cost is not null for any item
    if (items.length === 0 || (items && items.some(item => item.item_id === null))) {
      return <p> </p>; // Or return a message indicating no items available
    }
    return items.map((item) => (
      <div key={item.item_id}>
        <p>
          Item: {item.item_name}
        </p>
        {/* Add logic for rendering 'Take' or 'Buy' button based on cost */}
        {item.cost === 0 ? (
          <button className="rpgui-button" onClick={() => handleTakeItem(item.item_id)} disabled={disabledButtons.includes(item.item_id)}>Take</button>
        ) : (
          <button className="rpgui-button" onClick={() => handleBuyItem(item.item_id)} disabled={disabledButtons.includes(item.item_id)}>Buy</button>
        )}
      </div>
    ));
  };


  // Fighting Monsters/Enemies
  const handleFight = () => {
    const playerDiceRolls = rollBothDice();
    const playerAttackStrength = playerDiceRolls.reduce((sum, roll) => sum + roll, 0) + skill;

    const matchItems = inventoryItems.filter(item => item.monster_category === enemies[0].monster_category);

    setMatchingItems(matchItems);

    const playerModifiedAttackStrength = matchingItems.reduce((modifiedStrength, item) => {
      return modifiedStrength + item.effect_amount;
    }, playerAttackStrength);


    const updatedEnemies = enemies.map(enemy => {
      const enemyDiceRolls = rollBothDice();
      const enemyAttackStrength = enemyDiceRolls.reduce((sum, roll) => sum + roll, 0) + enemy.skill;

      if (playerModifiedAttackStrength > enemyAttackStrength) {
        //Player wounds the enemy
        return { ...enemy, stamina: enemy.stamina - 2};
      } else if (enemyAttackStrength > playerModifiedAttackStrength) {
        //Enemy wounds player
        setStamina(prevStamina => prevStamina - 2);
        return enemy;
      }
      // If you both miss, return the enemy unchanged
      return enemy;
    })
    .filter(enemy => enemy.stamina > 0);
    // Update the state with the modified enemeis array
    setEnemies(updatedEnemies);
    // Next combat round
    setCombatRound((prevCombatRound) => prevCombatRound + 1);

    if (updatedEnemies.length === 0 || updatedEnemies.some(monster => monster.monster_id === null)) {
      setShowCombatResults(false);
      setFightButton(true);
      setCombatRound(0);
      setInCombat(false);
    }
  };

  const rollBothDice = () => {
    const rolls = [];
    
    for (let i = 0; i < 2; i++) {
      const roll = getRandomNumber(1, 6);
      rolls.push(roll);
    }
  
    return rolls;
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const renderEnemies = () => {
    if (enemies.length === 0 || enemies.some(monster => monster.monster_id === null)) {
        return <p> </p>;
    }

    return enemies.map((monster) => (
        <div key={monster.monster_id}>
            <h2>
                {monster.monster_name}&emsp;&emsp;&emsp;&emsp;Skill: {monster.skill}&emsp;&emsp;Stamina: {monster.stamina}
            </h2>
        </div>
    ));
  };

  // const gameState = {
  //   gold,
  //   current_stamina: stamina,
  //   original_stamina: originalStamina,
  //   current_skill: skill,
  //   original_skill: originalSkill,
  //   current_luck: luck,
  //   original_luck: originalLuck,
  //   remaining_provisions: remainingProvisions,

  // };
  

  return (
    <div style={{width: '60%'}}>
    <div className='rpgui-container framed' style={{maxHeight: '99vh', overflowY: 'auto' }}>
      <h2>{data.title}</h2>
      <button className="rpgui-button golden"><p>Chapter: {data.chapter_id}</p></button>

      
      <div dangerouslySetInnerHTML={{ __html: data.text_body }} />
      <hr className='golden'></hr>

      <div>
        {Array.from({ length: 5 }, (_, i) => renderChoiceButton(i + 1))}
      </div>

      {renderItems()}

      

      {/* Display combat results */}
      {showCombatResults && (
        <div>
          <h4>Combat Round: {combatRound}</h4>
          <h2>Player Stamina: {stamina}</h2>
          <h3>Item Effects: {matchingItems[0].effect_name}</h3>
          {/* <h2>Player Attack Strength: {playerModifiedAttackStrength}</h2> */}
          {renderEnemies()}
        </div>
      )}

      {/* Display fight button after combatRound 0 */}
      {inCombat && <button className="rpgui-button" disabled={fightButton} onClick={() => {setShowCombatResults(true); handleFight();}}>Fight</button>}
      
      <div className="rpgui-right">
        <button onClick={goHome}>HOME</button>
        <SaveProgress />
        <button disabled={itemsAvailable} onClick={handleLoadGame}>LOAD</button>
        <DeleteProgress progressId={progressId}/>
      </div>    
      
    </div>
    </div>
  );
};

export default Book;

import React, { useEffect, useState } from 'react';

const Book = ({ inventoryItems, setInventoryItems, gold, setGold, enemies, setEnemies, diceResult, setDiceResult, skill, luck, stamina, setStamina, combatRound, setCombatRound }) => {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);

  useEffect(() => {
    fetchData(88);
  }, []);

  const fetchData = async (chapterId) => {
    try {
      const [storyResponse, itemsResponse, enemiesResponse] = await Promise.all([
        fetch(`http://localhost:3001/chapter/${chapterId}`),
        fetch(`http://localhost:3001/item/${chapterId}`),
        fetch(`http://localhost:3001/enemy/${chapterId}`)
      ]);

      const [storyResult, itemsResult, enemiesResult] = await Promise.all([
        storyResponse.json(),
        itemsResponse.json(),
        enemiesResponse.json()
      ]);

      setData(storyResult.length > 0 ? storyResult[0] : {});
      setItems(itemsResult);
      setEnemies(enemiesResult[0].monster_id !== null ? enemiesResult : {});
      setCombatRound(enemiesResult[0].monster_id !== null ? 1 : 0);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

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
          onClick={() => handleButtonClick(choiceNumber)} 
        >
          Turn to {choiceValue}
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
    if (items.length === 0 || items.some(item => item.item_id === null)) {
      return <p> </p>; // Or return a message indicating no items available
    }
  
    return items.map((item) => (
      <div key={item.item_id}>
        <p>
          Item: {item.item_name}
        </p>
        {/* Add logic for rendering 'Take' or 'Buy' button based on cost */}
        {item.cost === 0 ? (
          <button onClick={() => handleTakeItem(item.item_id)} disabled={disabledButtons.includes(item.item_id)}>Take</button>
        ) : (
          <button onClick={() => handleBuyItem(item.item_id)} disabled={disabledButtons.includes(item.item_id)}>Buy</button>
        )}
      </div>
    ));
  };



  // Fighting Monsters/Enemies
  const handleFight = () => {
    const playerDiceRolls = rollBothDice();
    const playerAttackStrength = playerDiceRolls.reduce((sum, roll) => sum + roll, 0) + skill;

    const updatedEnemies = enemies.map(enemy => {
      const enemyDiceRolls = rollBothDice();
      const enemyAttackStrength = enemyDiceRolls.reduce((sum, roll) => sum + roll, 0) + enemy.skill;

      if (playerAttackStrength > enemyAttackStrength) {
        //Player wounds the enemy
        return { ...enemy, stamina: enemy.stamina - 2};
      } else if (enemyAttackStrength > playerAttackStrength) {
        //Enemy wounds player
        setStamina(stamina - 2);
        return enemy;
      }
      // If you both miss, return the enemy unchanged
      return enemy;
    })
    .filter(enemy => enemy.stamina > 0);
    // Update the state with the modified enemeis array
    setEnemies(updatedEnemies);
    // Next combat round
    setCombatRound(combatRound + 1);
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


  

  return (
    <div>
      <h2>{data.title}</h2>
      <p>
        <strong>Chapter: {data.chapter_id}</strong>
      </p>
      <div dangerouslySetInnerHTML={{ __html: data.text_body }} />

      <div>
        {Array.from({ length: 5 }, (_, i) => renderChoiceButton(i + 1))}
      </div>

      {renderItems()}

      {/* Display fight button after combatRound 0 */}
      {combatRound > 0 && <button onClick={handleFight}>Fight</button>}

      {/* Display combat results */}
      {combatRound > 0 && (
        <div>
          <h4>Combat Round: {combatRound}</h4>
          <h2>Player Stamina: {stamina}</h2>
          {renderEnemies()}
        </div>
      )}
    </div>
  );
};

export default Book;

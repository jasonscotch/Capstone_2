import React, { createContext, useContext, useState} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const LOCAL_STORAGE_KEY = 'userData';

const GameContext = createContext();


export const GameProvider = ({ children }) => {
    const [GameData, setGameData] = useState(null);
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const [inventoryItems, setInventoryItems] = useState([{item_name: 'Map', effect_name: 'Just a map'}]);
    const [gold, setGold] = useState(0);
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

    const [data, setData] = useState({});
    const [items, setItems] = useState([]);
    const [itemsAvailable, setItemsAvailable] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [showCombatResults, setShowCombatResults] = useState(false);
    const [fightButton, setFightButton] = useState(false);
    const [matchingItems, setMatchingItems] = useState([]);

    const [progressId, setProgressId] = useState(0);


    const fetchData = async (chapterId) => {
      try {
        
        const headers = {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        };
  
        const [storyResult, itemsResult, enemiesResult] = await Promise.all([
          axios.get(`${BASE_URL}/chapter/${chapterId}`, { headers }),
          axios.get(`${BASE_URL}/item/${chapterId}`, { headers }),
          axios.get(`${BASE_URL}/enemy/${chapterId}`, { headers })
        ]);
        
        setData(storyResult.data.length > 0 ? storyResult.data[0] : {});
        setItems(itemsResult.data.length === 0 || (itemsResult.data[0].item_id === null) ? [] : itemsResult.data);
        setEnemies(enemiesResult.data[0].monster_id !== null ? enemiesResult.data : []);
      
        setInCombat(enemiesResult.data[0].monster_id !== null ? true : false);

        
        if (storyResult.data[0].gold !== null && !isNaN(storyResult.data[0].gold)) {
          setGold(prevGold => prevGold + storyResult.data[0].gold);
        };

        if (storyResult.data[0].skill_change !== null && !isNaN(storyResult.data[0].skill_change)) {
          setSkill(prevSkill => prevSkill + storyResult.data[0].skill_change);
        };

        if (storyResult.data[0].stamina_change !== null && !isNaN(storyResult.data[0].stamina_change)) {
          setSkill(prevStamina => prevStamina + storyResult.data[0].stamina_change);
        };
        
        if (storyResult.data[0].luck_change !== null && !isNaN(storyResult.data[0].luck_change)) {
          setSkill(prevLuck => prevLuck + storyResult.data[0].luck_change);
        };


  
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    const NewGame = async () => {
      navigate('/game');
      await fetchData(401);
    };

    const LoadSavedGame = async () => {
      navigate('/game');
      try {
          const headers = {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            };
  
          const response = await axios.get(`${BASE_URL}/load-progress`, { headers });
  
          const gameData = response.data.savedGameData;
          const gameState = gameData.game_state;
  
          fetchData(gameData.chapter_id);

          setInitialStaminaInputDone(true); 
          setInitialLuckInputDone(true);
          setInitialSkillInputDone(true);

          setInventoryItems(gameData.inventory);
          setGold(gameState.gold);
          setOriginalSkill(gameState.original_skill);
          setOriginalStamina(gameState.original_stamina);
          setOriginalLuck(gameState.original_luck);
          setSkill(gameState.current_skill);
          setStamina(gameState.current_stamina);
          setLuck(gameState.current_luck);
          
          setRemainingProvisions(gameState.remaining_provisions); 

          setProgressId(gameData.id);


      } catch (error) {
          console.error('Error loading saved game:', error);
          throw error;
      }
    };
    
    const GameContextValue = React.useMemo(() => ({
        GameData,
        NewGame,
        LoadSavedGame,
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
        fetchData,
        progressId,
        setProgressId

      }), [GameData, LoadSavedGame, NewGame, data, items, enemies, inventoryItems, progressId, gold, setGold]);
      
    return (
        <GameContext.Provider value={GameContextValue}>
          {children}
        </GameContext.Provider>
      );
};

export const useGame = () => {
    return useContext(GameContext);
};
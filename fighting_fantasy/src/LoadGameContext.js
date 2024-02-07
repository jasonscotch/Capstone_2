import React, { createContext, useContext, useState} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const LOCAL_STORAGE_KEY = 'userData';

const LoadGameContext = createContext();

export const LoadGameProvider = ({ children }) => {
    const [loadGameData, setLoadGameData] = useState(null);
    const { user } = useAuth();
    // console.log(user);
    // const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    const loadSavedGame = async ({ setInventoryItems, setGold, setSkill, setStamina, setLuck, setOriginalSkill, setOriginalStamina, setOriginalLuck, setRemainingProvisions, setInitialStaminaInputDone, setInitialLuckInputDone, setInitialSkillInputDone, fetchData }) => {

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


        } catch (error) {
            console.error('Error loading saved game:', error);
            throw error;
        }
    };
    
    const LoadGameContextValue = React.useMemo(() => ({
        loadGameData,
        loadSavedGame
      }), [loadGameData, loadSavedGame]);
      
    return (
        <LoadGameContext.Provider value={LoadGameContextValue}>
          {children}
        </LoadGameContext.Provider>
      );
};

export const useLoadGame = () => {
    return useContext(LoadGameContext);
};
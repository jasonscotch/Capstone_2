import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useGame } from "./GameContext";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const SaveProgress = () => {
  const { user } = useAuth();

  const { 
    inCombat, 
    inventoryItems, 
    itemsAvailable, 
    setProgressId, 
    setLoadId, 
    gold, 
    stamina, 
    originalStamina, 
    skill, 
    originalSkill, 
    luck, 
    originalLuck, 
    remainingProvisions,
    data  
  } = useGame();
  
  const gameState = {
    gold,
    current_stamina: stamina,
    original_stamina: originalStamina,
    current_skill: skill,
    original_skill: originalSkill,
    current_luck: luck,
    original_luck: originalLuck,
    remaining_provisions: remainingProvisions
  };

  const [showSaveInput, setShowSaveInput] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSave = () => {
    setShowSaveInput(true);
  };

  const handleSaveConfirm = async () => {
    try {
      setSaving(true);
      const response = await axios.post(
        `${BASE_URL}/save-progress`,
        { userId: user.id, storyId: data.story_id, chapterId: data.chapter_id, gameState: JSON.stringify(gameState), inventory: JSON.stringify(inventoryItems), saveName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Handle the response accordingly (e.g., show success message)
    //   console.log(response.data.savedProgress);
      const game = response.data.savedProgress;
      console.log(game);
      setProgressId(game.id);
      setShowSaveInput(false);

    } catch (error) {
      console.error('Error saving progress:', error);
      setSaveError('Error saving progress. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => setShowSaveInput(false);

  return (
    <div >
      {showSaveInput ? (
        <div>
          <label>
            Save Name:
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
          </label>
          <button onClick={cancel}>CANCEL</button>
          <button onClick={handleSaveConfirm} disabled={saving}>
            {saving ? 'SAVING...' : 'SAVE'}
          </button>
          {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
        </div>
      ) : (
        <button disabled={inCombat || itemsAvailable} onClick={handleSave}>
        SAVE
      </button>
      )}
    </div>
  );
};

export default SaveProgress;

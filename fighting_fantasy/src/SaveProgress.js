import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const SaveProgress = ({ inCombat, storyId, chapterId, gameState, inventory, itemsAvailable, loadId, setLoadId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
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
        { userId: user.id, storyId, chapterId, gameState: JSON.stringify(gameState), inventory: JSON.stringify(inventory), saveName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Handle the response accordingly (e.g., show success message)
      console.log(response.data.savedProgress);
      const game = response.data.savedProgress;
      setLoadId(response.data.savedProgress);
      setShowSaveInput(false);

    } catch (error) {
      console.error('Error saving progress:', error);
      setSaveError('Error saving progress. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button disabled={inCombat || itemsAvailable} onClick={handleSave}>
        SAVE
      </button>
      {showSaveInput && (
        <div>
          <label>
            Save Name:
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
          </label>
          <button onClick={handleSaveConfirm} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
        </div>
      )}
      <button onClick={goHome}>HOME</button>
    </div>
  );
};

export default SaveProgress;

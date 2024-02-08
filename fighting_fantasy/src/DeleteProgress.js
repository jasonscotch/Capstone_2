import React, { useState } from 'react';
import axios from 'axios';
import { useGame } from "./GameContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const DeleteProgress = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { progressId } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/delete-progress/${progressId}`, 
        {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
      goHome();
      } catch (error) {
        console.error('Error deleting game progress', error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  const cancel = () => setConfirmDelete(false);

  return (
    <div>
      {confirmDelete ? (
        <>
          <p>Are you sure you want to delete your game progress?</p>
          <button onClick={cancel}>CANCEL</button>
          <button onClick={handleDelete}>DELETE</button>
        </>
      ) : (
        <button onClick={handleDelete}>DELETE</button>
      )}
    </div>
  );
};

export default DeleteProgress;

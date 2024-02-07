import React, { useState } from 'react';
import axios from 'axios';

const DeleteProgress = ({ progressId }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await axios.delete(`/delete-progress/${progressId}`);
    
      } catch (error) {
        console.error('Error deleting game progress', error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div>
      {confirmDelete ? (
        <>
          <p>Are you sure you want to delete your game progress?</p>
          <button onClick={handleDelete}>Confirm Delete</button>
        </>
      ) : (
        <button onClick={handleDelete}>DELETE</button>
      )}
    </div>
  );
};

export default DeleteProgress;

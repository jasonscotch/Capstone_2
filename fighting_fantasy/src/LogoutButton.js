import React from 'react';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    // Perform logout logic (e.g., clear user data)
    await logout();

    // Redirect to the login page or homepage after successful logout
    // (You can use the Navigate component from 'react-router-dom')
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

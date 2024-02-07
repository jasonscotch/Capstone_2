import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { username, password };
    await login(userData);

  };

  // Check if the user is already logged in
  useEffect(() => {
    if (user) {

      navigate('/', { replace: true }); // Add this line
    }
  }, [user]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

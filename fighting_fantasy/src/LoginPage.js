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
    <div className='main'>
      <div className='rpgui-container framed'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <br />
          <br />
          <button className="rpgui-button" type='submit'><p>Login</p></button>
        </form>
      </div> 
    </div>
  );
};

export default LoginPage;

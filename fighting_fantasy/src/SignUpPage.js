import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './dist/rpgui.css';


const SignUpPage = () => {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/login');
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    signUp({ username, password });
  };

  return (
    <div className="main">
      <div className="rpgui-container framed">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <br />
          <button className="rpgui-button" type="submit"><p>Sign Up</p></button>
          <button className="rpgui-button" onClick={handleCancel}><p>Cancel</p></button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

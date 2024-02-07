import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useLoadGame } from "./LoadGameContext";


function Home({ loadId }) {
    const navigate = useNavigate();
    const startGame = () => { navigate('/game'); };

    const { logout } = useAuth();

    const handleLogout = async () => { await logout(); };


    return (
        <div>
            <h3>Shadow of the Giants</h3>
            <h5>YOU ARE THE HERO</h5>
            <h6>FIGHTING FANTASY</h6>
            <button onClick={startGame}>Start Game</button>
            <button onClick={loadGame}>Load Game</button>
            <button>Settings</button>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Home;
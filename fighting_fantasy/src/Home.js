import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useGame } from "./GameContext";
import './dist/rpgui.css';

function Home() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { LoadSavedGame, NewGame } = useGame();

    const startGame = async () => { await NewGame(); };
    const handleLogout = async () => { await logout(); };
    
    const handleLoadGame = async () => { 
        await LoadSavedGame(); 
      };

    return (
        <div className="main">
            <div className="rpgui-center">
                <div className="rpgui-container framed">
                    <h1>Shadow of the Giants</h1>
                    <h2>FIGHTING FANTASY - You are the Hero</h2>
                    <hr className="golden"></hr>
                    <div className="rpgui-center-buttons">
                        <button className="rpgui-button golden" type="button" onClick={startGame}>
                            <p>Start Game</p>
                        </button>
                        <button className="rpgui-button golden" type="button" onClick={handleLoadGame}>
                            <p>Load Game</p>
                        </button>
                        <button className="rpgui-button golden" type="button">
                            <p>Settings</p>
                        </button>
                        <button className="rpgui-button golden" type="button" onClick={handleLogout}>
                            <p>Log Out</p>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;

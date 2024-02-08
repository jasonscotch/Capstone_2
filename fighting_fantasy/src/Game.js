import React, { useEffect, useState } from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Book from "./Book.js";
import AdventureSheet from "./AdventureSheet.js";
import { useGame } from "./GameContext";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';


function Game() {
  
  const { stamina } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (stamina <= 0) {
      navigate('/death');
    }
  }, [stamina]);
  
  return (
    <div className="main-game">

            <Book />

            <AdventureSheet />

    </div>
       
  );
}

export default Game;

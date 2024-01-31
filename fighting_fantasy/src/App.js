import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import DeathPopup from './DeathPopup';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/death' element={<DeathPopup /> } />
        <Route path='*' element={<h3>404 Error! Hmmmm. I can't seem to find what you are looking for.</h3>} />
      </Routes>
    </Router>
    
    
  );
}

export default App;

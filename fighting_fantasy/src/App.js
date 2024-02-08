import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import NavBar from "./NavBar.js";
import DeathPopup from './DeathPopup';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import { GameProvider } from './GameContext';


function App() {
  // const [loadId, setLoadId] = useState({});


  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <NavBar />
            
              <Routes>
                <Route path='/sign-up' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route exact path='/' element={<Home />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path='/game' element={<Game />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path='/death' element={<DeathPopup />} />
                </Route>

                {/* <Route path='/logout' element={<LogoutButton />} /> */}
                
                <Route path='*' element={<h3>404 Error! Hmmmm. I can't seem to find what you are looking for.</h3>} />
              </Routes>
            
        </GameProvider>
      </AuthProvider>
    </Router>
    
  );
}

export default App;

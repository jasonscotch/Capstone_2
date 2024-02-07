import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import DeathPopup from './DeathPopup';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import { LoadGameProvider } from './LoadGameContext';


function App() {
  const [loadId, setLoadId] = useState({});


  return (
    <Router>
      <AuthProvider>
        <LoadGameProvider>
          <Routes>
            <Route path='/register' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route exact path='/' element={<Home loadId={loadId} />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/game' element={<Game loadId={loadId} setLoadId={setLoadId} />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/death' element={<DeathPopup />} />
            </Route>

            {/* <Route path='/logout' element={<LogoutButton />} /> */}
            
            <Route path='*' element={<h3>404 Error! Hmmmm. I can't seem to find what you are looking for.</h3>} />
          </Routes>
        </LoadGameProvider>
      </AuthProvider>
    </Router>
    
  );
}

export default App;

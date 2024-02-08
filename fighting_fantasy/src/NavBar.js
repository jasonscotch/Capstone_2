import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavbarBrand, NavItem, Button } from "reactstrap";
import "./NavBar.css";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toSignup = () => navigate('/sign-up'); 
  const toLogin = () => navigate('/login'); 

  return (
    
      <div className="rpgui-container framed-golden-2">
        <Navbar className="position-absolute top-0 end-0">
          <NavLink href="/">
            FIGHTING FANTASY
          </NavLink>
          <span className="right">
            {user ? (
            
              <button to='/' onClick={logout}>LOG OUT</button>
                
            ) : (
              <>
               <button onClick={toSignup} >SIGN UP</button>
               <button onClick={toLogin} >LOGIN</button>
              </>
            )}
        </span>
        </Navbar>
      </div>
    
    
  );
}

export default NavBar;

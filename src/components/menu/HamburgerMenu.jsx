import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import MiniProfile from "../miniProfileComponent/MiniProfile";

import './../../css/HamburgerMenu.css';
import keycloak from '../../keycloak';
import { Nav } from 'react-bootstrap';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("open")
    setIsOpen(!isOpen);
  };

  const register = () => {
    keycloak.register()
  }

  return (
    <div className="hamburger-menu-component">
      <button className="hamburger-button-component" onClick={toggleMenu}>
        <p className='hamburger-img-component'><RxHamburgerMenu /></p>
      </button>
      {isOpen && (
          <ul className='hamburger-ul-component'>
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={toggleMenu}>
                About
              </NavLink>
            </li>
            {!keycloak.authenticated && (
              <>
                <li>
                  <NavLink onClick={ () => keycloak.login()}>
                    Log Inn
                  </NavLink>
                </li>
                <li> 
                  <NavLink onClick={() => keycloak.register()}> 
                    Register 
                  </NavLink>
                </li>
              </>
            )}
            {keycloak.authenticated && (
              <>
              <li>
                <NavLink onClick={() => keycloak.logout()}>
                  Log out 
                </NavLink>
              </li>
              </>
            )}
            {/* Add other links as needed */}
          </ul>
      )}
      <NavLink to="/">
        <div className="top-navbar-log-menu-hamburger">
          <p className="logo">Human</p>
          <p id="vs" className="logo">vs</p>
          <p className="logo">Zombies</p>
        </div>
      </NavLink>
    </div>
  );
};

export default HamburgerMenu;

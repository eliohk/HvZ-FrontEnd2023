import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import MiniProfile from "../miniProfileComponent/MiniProfile";


import './../../css/HamburgerMenu.css';
import keycloak from '../../keycloak';

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
        <nav className="hamburger-nav-component">
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
            <li>
              <NavLink onClick={register} 
              >
                Sign Up
              </NavLink>
            </li>
            {/* Add other links as needed */}
          </ul>
        </nav>
      )}
          <NavLink to="/">
                        <div className="top-navbar-log-menu-hamburger">
                            <p className="logo">Human</p>
                            <p id="vs" className="logo">vs</p>
                            <p className="logo">Zombies</p>
                        </div>
                    </NavLink>
      <MiniProfile/>
    </div>
  );
};

export default HamburgerMenu;

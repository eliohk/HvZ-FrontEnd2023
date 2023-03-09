import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useState, forwardRef } from "react";
import { slide as Menu } from 'react-burger-menu'
import Dropdown from 'react-bootstrap/Dropdown';

import AdminPage from "../../pages/adminPage/AdminPage";
import LandingPage from "../../pages/landingPage/LandingPage";
import GameDetailsPage from "../../pages/gameDetailsPage/GameDetailsPage";
import MiniProfile from "../miniProfileComponent/MiniProfile";
import GameDetails from "../gameDetailsComponent/GameDetails";

import logo from "../../resources/tempIcon.png";

import "../../css/topNavbar.css";

const TopNavbar = () => {
    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="element"
      >
        {children}
        <MiniProfile />
      </a>
      ));

    return (
        <BrowserRouter>
            <div className="navigation">
                <div className="navContainer">
                    <NavLink to="/" className="element">
                        <div className="innerContainerNavbar">
                            <div className="alignLogo">
                                <img className="logoPicture" src={logo} width="40" alt=""></img>
                            </div>
                            <p className="logo">Humans vs Zombies</p>
                        </div>
                    </NavLink>

                    <NavLink to="/Home" className="element">
                        <div className="innerContainerNavbar">
                            <span>Home</span>
                        </div>
                    </NavLink>

                    <NavLink to="/signup" className="element">
                        <div className="innerContainerNavbar">
                            <span>Sign up</span>
                        </div>
                    </NavLink>

                    <NavLink to="/about" className="element">
                        <div className="innerContainerNavbar">
                            <span>About</span>
                        </div>
                    </NavLink>
                        
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic"/>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Sign out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/game" element={<GameDetailsPage />}/>
                <Route path="/admin" element={<AdminPage />}/>
            </Routes>
        </BrowserRouter>
      
    );
}

export default TopNavbar;
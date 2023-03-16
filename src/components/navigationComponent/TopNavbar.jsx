import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useState, forwardRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

import LandingPage from "../../pages/landingPage/LandingPage";
import GameDetailsPage from "../../pages/gameDetailsPage/GameDetailsPage";
import MiniProfile from "../miniProfileComponent/MiniProfile";
import GameDetails from "../gameDetailsComponent/GameDetails";
import { fetchGameById } from "../../states/dataSlice";
import { useSelector } from "react-redux";

import "../../css/topNavbar.css";
import Register from "../registerComponent/Register";

const TopNavbar = () => {
    const state = useSelector((data) => data);

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
                            <p className="logo">Human</p>
                            <p id="vs" className="logo">vs</p>
                            <p className="logo">Zombies</p>
                        </div>
                    </NavLink>

                    <NavLink to="/" className="element">
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
                        <Dropdown.Item href="/register">register</Dropdown.Item>
 
                            <Dropdown.Item href="#/action-1">Sign out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/game/:gameId" element={<GameDetailsPage games={state.data.gamesArray}/>}/>
                <Route path="/register" element={<Register />}/>

            </Routes>
        </BrowserRouter>
      
    );
}

export default TopNavbar;
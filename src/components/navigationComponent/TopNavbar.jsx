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
import AboutPage from "../../pages/aboutPage/AboutPage";
import keycloak from "../../keycloak";

const TopNavbar = () => {
    const state = useSelector((data) => data);

    
    //console.log("sjekker staten", state);
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

    const authent = () => {
        if (keycloak.authenticated == true) {
            return (
                <BrowserRouter>
                    <div className="navigation">
                        <div className="navContainer">
                            <NavLink to="/" className="element">
                                <div className="top-navbar-log">
                                    <p className="logo">Human</p>
                                    <p id="vs" className="logo">vs</p>
                                    <p className="logo">Zombies</p>
                                </div>
                            </NavLink>
                            <div className="navLinkContainer">
                                <NavLink to="/" className="element">
                                    <div className="innerContainerNavbar">
                                        <span>Home</span>
                                    </div>
                                </NavLink>

                                <NavLink onClick={() => keycloak.register()} className="element">
                                    <div className="innerContainerNavbar">
                                        <span>Sign up</span>
                                    </div>
                                </NavLink>
                                <NavLink to="/about" className="element">
                                    <div className="innerContainerNavbar">
                                        <span>About</span>
                                    </div>
                                </NavLink>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic" />
                                <Dropdown.Menu>
                                    {keycloak.authenticated && (
                                        <Dropdown.Item onClick={() => keycloak.logout()}>Sign out</Dropdown.Item>
                                    )}
                                    {!keycloak.authenticated && (
                                        <Dropdown.Item onClick={() => keycloak.login()}>Sign in</Dropdown.Item>
                                    )}

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/game/:gameId" element={<GameDetailsPage games={state.data.gamesArray} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </BrowserRouter>

            )
        }
        else {
            return (
                <BrowserRouter>
                    <div className="navigation-no-aut">
                        <div className="navContainer-no-auth">
                            <div className="navbar-container-no-auth">

                                <div className="navLinkContainer">
                                    <NavLink to="/" className="element">
                                        <div className="innerContainerNavbar-no-auth">
                                            <span>Home</span>
                                        </div>
                                    </NavLink>

                                    <NavLink onClick={() => keycloak.register()} className="element">
                                        <div className="innerContainerNavbar-no-auth">
                                            <span>Sign up</span>
                                        </div>
                                    </NavLink>

                                    <NavLink to="/about" className="element">
                                        <div className="innerContainerNavbar-no-auth">
                                            <span>About</span>
                                        </div>
                                    </NavLink>
                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic" />
                                    <Dropdown.Menu>
                                        {keycloak.authenticated && (
                                            <Dropdown.Item onClick={() => keycloak.logout()}>Sign out</Dropdown.Item>
                                        )}
                                        {!keycloak.authenticated && (
                                            <Dropdown.Item onClick={() => keycloak.login()}>Sign in</Dropdown.Item>
                                        )}

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="logo-main-content">
                            <NavLink to="/">
                                <div className="top-navbar-log-no-auth">
                                    <p className="logo">Human</p>
                                    <p id="vs" className="logo">vs</p>
                                    <p className="logo">Zombies</p>
                                </div>
                            </NavLink>
                            </div>
                        </div>
                        <p className='top-navbar-main-content'>
                            Lorem Ipsum er rett og slett dummytekst fra og for trykkeindustrien. Lorem Ipsum har vært bransjens standard for dummytekst helt siden 1500-tallet,
                            da en ukjent boktrykker stokket en mengde bokstaver for å lage et prøveeksemplar av en bok. Lorem Ipsum har tålt tidens tann usedvanlig godt,
                            og har i tillegg til å bestå gjennom fem århundrer også tålt spranget over til elektronisk typografi uten vesentlige endringer.
                            Lorem Ipsum ble gjort allment kjent i 1960-årene ved lanseringen av Letraset-ark med avsnitt fra Lorem Ipsum,
                            og senere med sideombrekkingsprogrammet Aldus PageMaker som tok i bruk nettopp Lorem Ipsum for dummytekst.
                        </p>
                    </div>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/game/:gameId" element={<GameDetailsPage games={state.data.gamesArray} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </BrowserRouter>

            )

        }

    }

    return (
        <>
            {authent()}
        </>
    );
}

export default TopNavbar;
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

 const  LandingPage = () => {

    
    async function getuser() {
        try {
             const response  = await axios.get('http://localhost:8080/api/v1/users/getAllUser');
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    getuser();
       

    const [ sortVariable, setSortVariable ] = useState("Title");

    const handleSortVariable = (event) => {
        let retval = event.target.innerHTML;
        setSortVariable(retval);
    }

    const handleGameClick = (i) => (event) => {
        console.log(i);
    }

    let gameArray = [
        {
            title: "Kids @ Noroff",
            gameMode: "Hide & Seek",
            status: "Completed",
            date: "2023-03-08",
            maxPlayers: 12,
            players: 8
        }, 
        {
            title: "Grownups @ Noroff",
            gameMode: "Capture the flag",
            status: "In progress",
            date: "2023-03-08",
            maxPlayers: 24,
            players: 23
        }
    ]

    const games = gameArray.map((gameData, i) => {
        return (
            <NavLink to="/game" className="removeUnderline">
                <div className='widthConstraint' onClick={handleGameClick(i)} key={i}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

    return (
        <div className="mainLandingContainer">
            <div className="secondaryLandingContainer">
                <div className="sortByContainer">
                    <label id="label">Sort by</label>
                    <SplitButton variant="primary" key="end" drop="end" id="dropdown-button-drop-end" className="endBtn" title={sortVariable}>
                        <div className="horizontalItems">
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Date</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>State</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Players</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Title</Dropdown.Item>
                        </div>
                    </SplitButton>
                </div>
                {games}
            </div>
        </div>
    )
}

export default LandingPage;
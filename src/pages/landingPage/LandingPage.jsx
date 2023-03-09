import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';

const LandingPage = () => {

    const [ sortVariable, setSortVariable ] = useState("Title");

    const handleSortVariable = (event) => {
        let retval = event.target.innerHTML;
        setSortVariable(retval);
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
        return <GameListComponent game={gameData} key={i}></GameListComponent>
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
                <div className="widthConstraint">
                    {games}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
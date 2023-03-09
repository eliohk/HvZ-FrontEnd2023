import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GameListComponent from "../../components/gameListComponent/GameListComponent"

import "../../css/landingPage.css";

const LandingPage = () => {

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

    const games = gameArray.map((gameData) => {
        return <GameListComponent game={gameData}></GameListComponent>
    });

    return (
        <div className="mainLandingContainer">
            <div className="sortByContainer">
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Sort by">
                    <Dropdown.Item href="#/action-1">Players</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Game Status</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Date</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Title</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className="widthConstraint">
                {games}
            </div>
        </div>
    )
}

export default LandingPage;
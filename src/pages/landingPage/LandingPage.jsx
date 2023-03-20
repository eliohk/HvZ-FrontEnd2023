import Dropdown from 'react-bootstrap/Dropdown';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchGames, fetchGameById, postGame } from '../../states/dataSlice';
import keycloak from "../../keycloak";


 const  LandingPage = () => {
    const [ sortVariable, setSortVariable ] = useState("Title");
    const allGames = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSortVariable = (event) => {
        let retval = event.target.innerHTML;
        console.log(retval)
        setSortVariable(retval);
    };

    const handleGameClick = (i) => (event) => {
        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
    };

    const gamesSortedTitle = [].concat(allGames.data.gamesArray)
        .sort((a, b) => a.title > b.title ? 1 : -1)
        .map((gameData, i) => {
        return (
            <NavLink className="removeUnderline" key={i}>
                <div className='widthConstraint' onClick={handleGameClick(i)}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

    const gamesSortedState = [].concat(allGames.data.gamesArray)
        .sort((a, b) => a.status < b.status ? 1 : -1)
        .map((gameData, i) => {
        return (
            <NavLink className="removeUnderline" key={i}>
                <div className='widthConstraint' onClick={handleGameClick(i)}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

    const gamesSortedPlayers = [].concat(allGames.data.gamesArray)
        .sort((a, b) => (a.players) > (b.players) ? 1 : -1)
        .map((gameData, i) => {
        return (
            <NavLink className="removeUnderline" key={i}>
                <div className='widthConstraint' onClick={handleGameClick(i)}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

    // TODO not sure if this one works properly!
    const gamesSortedDate = [].concat(allGames.data.gamesArray)
        .sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
        .map((gameData, i) => {
        return (
            <NavLink className="removeUnderline" key={i}>
                <div className='widthConstraint' onClick={handleGameClick(i)}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

    let gamesArray;
    if (sortVariable === 'Title'){
        gamesArray = gamesSortedTitle;
    } else if (sortVariable === 'Date'){
        gamesArray = gamesSortedDate
    } else if (sortVariable === 'Players'){
        gamesArray = gamesSortedPlayers
    } else if (sortVariable === 'State'){
        gamesArray = gamesSortedState
    }

    const handleNewGame = () => {
        console.log("Henlo")

        const gameObj = {
            title: "New Game",
            description: "Newest game",
            gameType: "Some new game",
            maxPlayers: 2
        }

        dispatch(postGame(gameObj))
    }



    useEffect(() => {
        if (!allGames.data.gamesArray) {
            dispatch(fetchGames());
        }
    }, []);

    return (
        <div className="mainLandingContainer">
            <div className="secondaryLandingContainer">
                <div className="sortByContainer">
                    <label id="label">Sort by</label>
                    <SplitButton variant="primary" key="end" drop="end" id="dropdown-button-drop-end" title={sortVariable}>
                        <div className="horizontalItems">
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Date</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>State</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Players</Dropdown.Item>
                            <Dropdown.Item className="items" onClick={handleSortVariable}>Title</Dropdown.Item>
                        </div>
                    </SplitButton>
                </div>
                {gamesArray}
            </div>
                <button onClick={handleNewGame}>New game</button>
        </div>  
    )
}

export default LandingPage;
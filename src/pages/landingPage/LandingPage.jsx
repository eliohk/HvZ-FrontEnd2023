import Dropdown from 'react-bootstrap/Dropdown';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchGames, fetchGameById } from '../../states/dataSlice';

 const  LandingPage = () => {
    const [ sortVariable, setSortVariable ] = useState("Title");
    const allGames = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSortVariable = (event) => {
        let retval = event.target.innerHTML;
        setSortVariable(retval);
    };

    const handleGameClick = (i) => (event) => {
        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
    };

    const games = allGames.data.gamesArray.map((gameData, i) => {
        return (
            <NavLink className="removeUnderline" key={i}>
                <div className='widthConstraint' onClick={handleGameClick(i)}>
                    <GameListComponent game={gameData} key={i}></GameListComponent>
                </div>                
            </NavLink>
        );
    });

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
                {games}
            </div>
        </div>
    )
}

export default LandingPage;
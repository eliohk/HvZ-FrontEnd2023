import Dropdown from 'react-bootstrap/Dropdown';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchGames, fetchGameById, postGame, postPlayer } from '../../states/dataSlice';
import { GrAddCircle } from 'react-icons/gr';
import keycloak from "../../keycloak";


import {
    Dialog,
    DialogContent,

} from "@mui/material";


const LandingPage = () => {
    const [sortVariable, setSortVariable] = useState("Title");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [gameType, setGameType] = useState("")
    const [maxPlayer, setMaxPlayer] = useState(0)
    const [open, setOpen] = useState(false);


    const allGames = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSortVariable = (event) => {
        let retval = event.target.innerHTML;
        //console.log(retval)
        setSortVariable(retval);
    };

    const handleGameClick = (i) => (event) => {
        //console.log("handlegame click ", i)
        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const gamesSortedTitle = [].concat(allGames.data.gamesArray)
        .sort((a, b) => a.title > b.title ? 1 : -1)
        .map((gameData, i) => {
            if (gameData == undefined) {
                return null
            } else {
                return (
                    <NavLink className="removeUnderline" key={i}>
                        <div className='widthConstraint' onClick={handleGameClick(gameData.id)}>
                            <GameListComponent game={gameData} key={gameData.id}></GameListComponent>
                        </div>
                    </NavLink>
                );
            }
        });

    const gamesSortedState = [].concat(allGames.data.gamesArray)
        .sort((a, b) => a.status < b.status ? 1 : -1)
        .map((gameData, i) => {
            if (gameData == undefined) {
                return null
            } else {
                return (
                    <NavLink className="removeUnderline" key={i}>
                        <div className='widthConstraint' onClick={handleGameClick(gameData.id)}>
                            <GameListComponent game={gameData} key={gameData.id}></GameListComponent>
                        </div>
                    </NavLink>
                );
            }
        });

    const gamesSortedPlayers = [].concat(allGames.data.gamesArray)
        .sort((a, b) => (a.players) > (b.players) ? 1 : -1)
        .map((gameData, i) => {
            if (gameData == undefined) {
                return null
            } else {
                return (
                    <NavLink className="removeUnderline" key={i}>
                        <div className='widthConstraint' onClick={handleGameClick(gameData.id)}>
                            <GameListComponent game={gameData} key={gameData.id}></GameListComponent>
                        </div>
                    </NavLink>
                );
            }
        });

    // TODO not sure if this one works properly!
    const gamesSortedDate = [].concat(allGames.data.gamesArray)
        .sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
        .map((gameData, i) => {
            if (gameData == undefined) {
                return null
            } else {
                return (
                    <NavLink className="removeUnderline" key={i}>
                        <div className='widthConstraint' onClick={handleGameClick(gameData.id)}>
                            <GameListComponent game={gameData} key={gameData.id}></GameListComponent>
                        </div>
                    </NavLink>
                );
            }
        });

    let gamesArray;
    if (allGames.data.gamesArray != undefined) {
        if (sortVariable === 'Title') {
            gamesArray = gamesSortedTitle;
        } else if (sortVariable === 'Date') {
            gamesArray = gamesSortedDate
        } else if (sortVariable === 'Players') {
            gamesArray = gamesSortedPlayers
        } else if (sortVariable === 'State') {
            gamesArray = gamesSortedState
        }
    }
    const handleNewGame = () => {
        // console.log("Henlo")

        const gameObj = {
            title: title,
            description: description,
            gameType: gameType,
            maxPlayers: maxPlayer
        }

        dispatch(postGame(gameObj))
        window.location.reload(false);
    }

    const titles = (e) => {
        setTitle(e.target.value);
    }


    const descriptions = (e) => {
        setDescription(e.target.value);
    }

    const gameTypes = (e) => {
        setGameType(e.target.value);

    }

    const maxAntallPlayer = (e) => {
        setMaxPlayer(e.target.value)
    }

    useEffect(() => {
        if (!allGames.data.gamesArray) {
            dispatch(fetchGames());
        }

        console.log(gamesArray)

    }, []);

    return (
         <div className="mainLandingContainer">
            <div className="secondaryLandingContainer">
                <div className='container-level-sort-create-game'>
                    {/* <div className="sortByContainer"> */}
                    {/* </div> */}
                    <div className='toggle-button-container'>
                        <SplitButton variant="primary" key="end" drop="end" id="dropdown-button-drop-end" title={sortVariable}>
                            <div className="horizontalItems">
                                <Dropdown.Item className="items" onClick={handleSortVariable}>Date</Dropdown.Item>
                                <Dropdown.Item className="items" onClick={handleSortVariable}>State</Dropdown.Item>
                                <Dropdown.Item className="items" onClick={handleSortVariable}>Players</Dropdown.Item>
                                <Dropdown.Item className="items" onClick={handleSortVariable}>Title</Dropdown.Item>
                            </div>
                        </SplitButton>
                    </div>
                    {keycloak.hasRealmRole("ADMIN") ? 
                        <div>
                            <button className="landingside-create-game-container" onClick={handleClickOpen}><GrAddCircle />  Create Game</button>
                            <Dialog className='testing' open={open} onClose={handleClose}>
                                <h3 className='dialog-content-modal' > Create a new game</h3>
                                <DialogContent className='dialog-content-modal' >
                                    <div className='align-input-label'>
                                        <label className='landingpage-label'>Game name</label>
                                        <input className='texfield'
                                            value={title}
                                            sx={{ fontWeight: 800 }}
                                            onChange={titles}>
                                        </input>
                                    </div>
                                    <div className='align-input-label'>
                                        <label className='landingpage-label'>Description</label>
                                        <input
                                            sx={{ fontWeight: 'bold' }}
                                            className='texfield'
                                            value={description}
                                            onChange={descriptions}>
                                        </input>
                                    </div>
                                    <div className='align-input-label'>
                                        <label className='landingpage-label'>Game type</label>
                                        <input
                                            className='texfield'
                                            value={gameType}
                                            onChange={gameTypes}>
                                        </input>
                                    </div>
                                    <div className='align-input-label'>
                                        <label className='landingpage-label'>Max number of player</label>
                                        <input
                                            className='texfield'
                                            value={maxPlayer}
                                            onChange={maxAntallPlayer}></input>
                                    </div>
                                    <div className='button-modal-container'>
                                        <button className='modal-button' onClick={(handleNewGame)}>save</button>
                                        <button className='modal-button' onClick={(handleClose)}>close</button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        :
                        null
                    }
                    {/* {<button className="landingside-create-game-container" onClick={handleClickOpen}><GrAddCircle />  Create Game</button> } */}
                </div>
                {gamesArray}
            </div>
        </div>
    )
}

export default LandingPage;


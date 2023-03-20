import Dropdown from 'react-bootstrap/Dropdown';
import GameListComponent from "../../components/gameListComponent/GameListComponent"
import { useState, useEffect } from 'react';
import "../../css/landingPage.css";
import SplitButton from 'react-bootstrap/SplitButton';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchGames, fetchGameById, postGame, postPlayer } from '../../states/dataSlice';
import keycloak from "../../keycloak";
import { GrAddCircle } from 'react-icons/gr';

import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
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
        console.log(retval)
        setSortVariable(retval);
    };

    const handleGameClick = (i) => (event) => {
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
    if (sortVariable === 'Title') {
        gamesArray = gamesSortedTitle;
    } else if (sortVariable === 'Date') {
        gamesArray = gamesSortedDate
    } else if (sortVariable === 'Players') {
        gamesArray = gamesSortedPlayers
    } else if (sortVariable === 'State') {
        gamesArray = gamesSortedState
    }

    const handleNewGame = () => {
        console.log("Henlo")

        const gameObj = {
            title: title,
            description: description,
            gameType: gameType,
            maxPlayers: maxPlayer
        }

        /*dispatch(postGame(Objec.key(gameObj).array.forEach(element => {
            gameObj[element] = 
            gameObj[element] = props.description,
            gameObj[element] = props.gameType,
            gameObj[element] = props.maxPlayers

        
        })))
        */
        console.log("tester allGame ", allGames)

        dispatch(postGame(gameObj))
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
    }, []);

    return (
        <div className="mainLandingContainer">
            <div className="secondaryLandingContainer">
                <div className='container-level-sort-create-game'>
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
                    <button className= "landingside-create-game-container" onClick={handleClickOpen}><GrAddCircle/>  Create Game</button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle> Create a new game</DialogTitle>
                        <DialogContent sx={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                p:1,
                                m: 1
                            
                            }
                        }>
                            <TextField sx={{m: 2}}
                                label="Game Title"
                                value={title}
                                onChange={titles}>
                            </TextField >
                            <TextField sx={{m: 2}}
                                label="Game description"
                                value={description}
                                onChange={descriptions}>
                            </TextField>
                            <TextField
                                sx={{m: 2}}
                                label="Game type"
                                value={gameType}
                                onChange={gameTypes}>
                            </TextField >
                            <TextField
                                sx={{m: 2}}
                                label="max number of player"
                                value={maxPlayer}
                                onChange={maxAntallPlayer}></TextField>
                            <Button onClick={(handleNewGame)}>save</Button>
                            <Button onClick={(handleClose)}>close</Button>

                        </DialogContent>
                    </Dialog>
                </div>

                {gamesArray}
            </div>
            {/* <button onClick={handleNewGame}>New game</button> */}
        </div>
    )
}

export default LandingPage;
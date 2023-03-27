import "../../css/modal.css";
import 'leaflet/dist/leaflet.css';
import PlayerListComponent from "../../components/playerListComponent/playerListComponent.jsx";
import Popup from 'reactjs-popup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSearchParams, useNavigate, createRoutesFromElements } from "react-router-dom";
import { useEffect, useState } from 'react'
import ChatViewComponent from "../../components/chatViewComponent/ChatViewComponent";
import MapComponent from "../../components/mapComponent/MapComponent";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayerByToken, fetchGameById, fetchGames } from "../../states/dataSlice";
import SquadListComponent from "../../components/playerListComponent/squadListComponent";
import SquadMemberListComponent from "../../components/playerListComponent/squadMemberListComponent";
import KillsListComponent from "../../components/playerListComponent/killsListComponent";
import BiteCodeComponent from "../../components/playerListComponent/biteCodeComponent";
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import { postPlayer } from "../../states/dataSlice";
import EditGameComponent from "../../components/editGameComponent/EditGameComponent";
import keycloak from "../../keycloak";
// TODO: USE REDUX TO POPULATE :))))
import ChatInputViewComponent from "../../components/chatInputViewComponent/ChatInputviewComponent";
import Pusher from "pusher-js";
import { AiOutlineWarning } from 'react-icons/ai';
import Alert from 'react-bootstrap/Alert';
import { current } from "@reduxjs/toolkit";
import { checkboxClasses } from "@mui/material";
import playerzIcon from "../../resources/playerzIcon.svg"
import squadzIcon from "../../resources/squadzIcon.svg"
import chatIcon from "../../resources/chatIcon.svg"


const GameDetailsPage = (props) => {
    const [listView, setListView] = useState("players");
    const [phoneListView, setPhoneListView] = useState("map");
    const allGames = useSelector((state) => state);
    const [editGameView, setEditGameView] = useState(false);
    const [ loading, setLoading ] = useState("");
    const [userJoined, setUserJoined] = useState(false);
    const [fullGame, setFullGame]  = useState(false);

    let currentGame = allGames.data.currGame;
    let currentPlayer;

    useEffect(() => {
        if (currentGame.players && !userJoined && keycloak.authenticated){
            let userName = keycloak.tokenParsed.preferred_username
            loop:
            for (let i = 0; i  < currentGame.players.length; i++){
                if (currentGame.players[i].username === userName){
                    currentPlayer = currentGame.players[i]
                    setUserJoined(true)
                    break loop;
                }
            }
        }
        if (currentGame && currentGame.players && currentGame.maxPlayers > currentGame.players.length) {
            setFullGame(false)
        } else {
            setFullGame(true)
        }
    }, [currentGame])

   // console.log("tester ut", typeof JSON.parse(data))

    // CONTAINS ALL DATA FOR GAME
    //console.log(currentGame.chat);

    const dispatch = useDispatch();

    const params = window.location.pathname;
    const id = params.split("/")[2];

    if (!currentGame.id) {
        dispatch(fetchGameById(id)).unwrap();
    }

    const pusher = new Pusher("12be8984736013be627b", {
        cluster: "eu",
    }); 

    window.addEventListener("beforeunload", (ev) => 
    {  
        pusher.unsubscribe("hvz-noroff");
    });

    const handleListView = (event) => {
        setListView(event.target.value);
    }

    const handlePhoneListView = (event) => {
        setPhoneListView(event.target.value);
    }

    const handleEditGame = (event) => {
        if (editGameView) {
            setEditGameView(false);
        } else {
            setEditGameView(true);
        }
    }

    const callback = (event) => {
        setEditGameView(false);
    }

    //const game = props.games[id];

    function getListView(view) {
        if (view == "players") {
            return <PlayerListComponent data={currentGame.players} squad={currentGame.squads} />;
        } else if (view == "squad") {
            return <SquadListComponent data={currentGame.squads} gameid={currentGame.id} players={currentGame.players} />;
        } else if (view == "human") {
            return <BiteCodeComponent />
        } else if (view == "zombie") {
            return <KillsListComponent kills={currentGame.kills} players={currentGame.players} gameId={currentGame.id} />;
        }
    }

    function getPhoneListView(view) {
        if (view == "players") {
            return <PlayerListComponent data={currentGame.players} squad={currentGame.squads} />;
        } else if (view == "squad") {
            return <SquadListComponent data={currentGame.squads} gameid={currentGame.id} players={currentGame.players} />;
        } else if (view == "human") {
            return <BiteCodeComponent />
        } else if (view == "zombie") {
            return <KillsListComponent kills={currentGame.kills} players={currentGame.players} gameId={currentGame.id} />;
        } else if (view == "map") {
            return <MapComponent players={currentGame.players} kills={currentGame.kills} device="phone"></MapComponent>
        } else if (view == "chat") {
            return (
                <div className="chatiesboxies">
                    <ChatViewComponent chat={currentGame.chat} pusher={pusher}/>
                    <div className="chatInputBox">
                        <ChatInputViewComponent currGame={currentGame} pusher={pusher}></ChatInputViewComponent>
                    </div>
                </div>
            )
        }
    }

    function handleNewPlayer() {
        const rand = Math.floor(100000 + Math.random() * 900000);
        let isHuman;
        if (currentGame.players.length == 0) {
            isHuman = false;
        } else {
            isHuman = true;
        }
        const playerObj = {
            userTokenRef: keycloak.idTokenParsed.sub,
            gameRef: currentGame.id,
            biteCode: rand,
            patientZero: isHuman,
            human: isHuman,
            username: keycloak.tokenParsed.preferred_username
        };

        dispatch(postPlayer(playerObj))
        setUserJoined(true)
    }

    function handleLeaveGame() {
        console.log(userJoined)
        let token = keycloak.idTokenParsed.sub
        const deleteObj = {
            token: token,
            callback: setUserJoined,
        }
        dispatch(deletePlayerByToken(deleteObj))
        setUserJoined(false)
    }

    const displayEditGameAdmin = () => {
        if (keycloak.hasRealmRole("ADMIN")) {
            return (
                <Popup trigger={<button id="btnEdit" onClick={handleEditGame}><img id="editBtnIcon" src={editIcon} alt="Edit Game Button" />Edit game</button>} modal>
                    {close => (<EditGameComponent game={currentGame} edit={close}></EditGameComponent>)}
                </Popup>

            )
        }
    }


    if (currentGame.id) {
        if (window.innerWidth < 1000) {
            return (
                <div className="centerDetails">
                    <h4 id="removeMargin" className="gameType">"{currentGame.gameType}"</h4>
                    <div className="topInfoHeader">
                        {keycloak.hasRealmRole("ADMIN") ?
                            <h5 className="adminHeader">Administrator</h5>
                            :
                            <h5 classNAme="adminHeader"></h5>
                        }
                        {displayEditGameAdmin()}
                    </div>
                    {keycloak.authenticated ? 
                        <div className="alignmentOfButtons">
                            <button id="phoneBtn" className="btns" onClick={handlePhoneListView} value="zombie">Kills</button>
                            <button id="phoneBtn" className="btns" onClick={handlePhoneListView} value="human">Bite code</button>
                        </div>
                        :
                        <div className="alignmentOfButtons">
                            <button id="phoneDisabled" value="zombie">Kills</button>
                            <button id="phoneDisabled" value="human">Bite code</button>
                        </div>
                    }
                    <div className="mainInfotainment">
                        <div className="Stretchy">
                            {getPhoneListView(phoneListView)}
                        </div>
                    </div>
                    <div className="joinBtnDiv">
                    {keycloak.authenticated ? 
                            userJoined ? 
                                <button id="leavePhoneBtn" onClick={handleLeaveGame}>Leave game</button>
                            :
                            fullGame ? <h2>Game is already full</h2>
                                : 
                                <button id="joinBtnPhone" onClick={handleNewPlayer}>Join game</button>
                        :
                        <button id="joinBtnPhone" onClick={() => keycloak.login()}>Log in</button>
                    }
                    {phoneListView != "map" ?
                        <button id="joinBtnPhone" onClick={handlePhoneListView} value="map">Back to map</button>
                        :
                        null
                    }
                    </div>
                    <div className="bodyButtons">
                        <button id="bodyBtn" onClick={handlePhoneListView} value="chat"><img src={chatIcon} alt="Chatbutton" /> Chat</button>
                        <button id="bodyBtn" onClick={handlePhoneListView} value="squad"><img src={squadzIcon} alt="Chatbutton" /> Squads</button>
                        <button id="bodyBtn" onClick={handlePhoneListView} value="players"><img src={playerzIcon} alt="Chatbutton" /> Players</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mostMainContainer">
                    <a href="/" id="retBtn" className="button"><img id="exitIcon" src={retIcon} alt="Return button" /></a>
                    <div className='mainContainer'>
                        <div className="header">
                            {keycloak.authenticated ? 
                                    userJoined ? 
                                    <button id="leaveBtn" onClick={handleLeaveGame}>Leave game</button>
                                    :
                                    fullGame ? <h2>Game is already full</h2>
                                        : 
                                        <button id="joinBtn" onClick={handleNewPlayer}>Join game</button>
                                :
                                <button id="joinBtn" onClick={() => keycloak.login()}>Log in</button>
                            }
                            {keycloak.hasRealmRole("ADMIN") ?
                                <h5 id="removeMargins">Administrator</h5>
                                :
                                <h5 id="removeMargins"></h5>
                            }
                            
                        </div>
                        <div className="liftToHeader">
                            <h2 id="removeMarginTitle">{currentGame.title}</h2>
                            <h4 id="removeMargin" className="gameType">"{currentGame.gameType}"</h4>
                        </div>
                        <p id="removeMargin" className="desc">{currentGame.description}</p>
                        <div className="secondaryContainer">
                            <div className="interactiveStuffContainer">
                                {/* map + squad list here */}
                                <div className="mapContainer">
                                    <MapComponent players={currentGame.players} kills={currentGame.kills}></MapComponent>
                                </div>
                                <div className="listContainer">
                                    {getListView(listView)}
                                </div>
                            </div>
                            <div className="chatContainer">
                                {/* chatbox + buttons here */}
                                <ChatViewComponent chat={currentGame.chat} pusher={pusher}/>
                                <div className="buttonContainerTest">
                                    <button className="btns" onClick={handleListView} value="players">List of players</button>
                                    <button className="btns" onClick={handleListView} value="squad">Squad list</button>
                                    <button className="btns" onClick={handleListView} value="human">Bite code</button>
                                    <button className="btns" onClick={handleListView} value="zombie">Kills</button>
                                </div>
                            </div>
                            <div className="chatInputContainer">
                                {/* chat toggle + chat input here */}
                                <div className="chatInput">
                                    <ChatInputViewComponent currGame={currentGame} pusher={pusher}></ChatInputViewComponent>
                                </div>
                            </div>
                            <div className="editDiv">
                                {displayEditGameAdmin()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className="container">
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", width:"100%"}}>
                    <Alert key="danger" variant="danger">
                        <AiOutlineWarning/> <i> This component has no functionality as i was too lazy to create dummy data</i>
                    </Alert>                
                </div>
            </div>
        )
    }
}

export default GameDetailsPage;


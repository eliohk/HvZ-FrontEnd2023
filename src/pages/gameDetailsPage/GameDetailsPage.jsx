import "../../css/modal.css";
import 'leaflet/dist/leaflet.css';
import PlayerListComponent from "../../components/playerListComponent/playerListComponent.jsx";
import Popup from 'reactjs-popup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSearchParams, useNavigate, createRoutesFromElements  } from "react-router-dom";
import { useEffect, useState } from 'react'
import ChatViewComponent from "../../components/chatViewComponent/ChatViewComponent";
import MapComponent from "../../components/mapComponent/MapComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById, fetchGames } from "../../states/dataSlice";
import SquadListComponent from "../../components/playerListComponent/squadListComponent";
import SquadMemberListComponent from "../../components/playerListComponent/squadMemberListComponent";
import KillsListComponent from "../../components/playerListComponent/killsListComponent";
import BiteCodeComponent from "../../components/playerListComponent/biteCodeComponent";
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import { postPlayer } from "../../states/dataSlice";
import EditGameComponent from "../../components/editGameComponent/EditGameComponent";
// TODO: USE REDUX TO POPULATE :))))

const GameDetailsPage = ( props ) => {
    const [ listView, setListView ] = useState("players");
    const allGames = useSelector((state) => state);
    const [ editGameView, setEditGameView ] = useState(false);

    let currentGame = allGames.data.currGame;

    const data = localStorage.getItem("currGame");

    const dataJSON = JSON.parse(data);
    // CONTAINS ALL DATA FOR GAME
    // console.log(currentGame);

    const dispatch = useDispatch();

    const handleMessage = () => {
        console.log("Handling message!")
    }

    const handleListView = (event) => {
        setListView(event.target.value);
    }

    const handleEditGame = (event) => {
        if (editGameView) {
            setEditGameView(false);
        } else {
            setEditGameView(true);
        }
    }

    const callback = (event) => {
        console.log("yo")
        setEditGameView(false);
    }

    const params = window.location.pathname;
    const id = params.split("/")[2];

    //const game = props.games[id];

    function getListView(view) {
        if (view == "players") {
            return <PlayerListComponent data={currentGame.players} squad={currentGame.squads}/>;
        } else if (view == "squad") {
            return <SquadListComponent data={currentGame.squads} gameid={currentGame.id}/>;
        } else if (view == "human") {
            return <BiteCodeComponent />
        } else if (view == "zombie") {
            return <KillsListComponent kills={currentGame.kills} players={currentGame.players} gameId={currentGame.id}/>;
        }
    }

    function handleNewPlayer() {        
        const playerObj = {
            biteCode: "12345",
            patientZero: false,
            human: true
        };

        dispatch(postPlayer(playerObj))
    }
    
    if (currentGame) {
        return (
            <div className="mostMainContainer">
                <div className='mainContainer'>
                    <div className="header">
                        <h5 id="removeMargin">Administrator</h5>
                        <a href="/" id="retBtn" className="button"><img id="exitIcon" src={retIcon} alt="Return button"/></a>
                    </div>
                    <div className="liftToHeader">
                        <h2 id="removeMargin">{currentGame.title}</h2>
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
                            <ChatViewComponent />
                            <div className="buttonContainer">
                                <button className="btns" onClick={handleListView} value="players">List of players</button>
                                <button className="btns" onClick={handleListView} value="squad">Squad list</button>
                                <button className="btns" onClick={handleListView} value="human">Bite code</button>
                                <button className="btns" onClick={handleListView} value="zombie">Kills</button>
                            </div>
                        </div>
                        <div className="chatInputContainer">
                            {/* chat toggle + chat input here */}
                            <div className="chatInput">
                                <DropdownButton id="dropdown-basic-button" title="Squad chat">
                                    <Dropdown.Item>Squad chat</Dropdown.Item>
                                    <Dropdown.Item>Human chat</Dropdown.Item>
                                    <Dropdown.Item>Zombie chat</Dropdown.Item>
                                </DropdownButton>
                                <div className="actualInput">
                                    <input id="input" type="text" name="name" />
                                </div>
                            </div>
                        </div>
                        <div className="editDiv">
                            <Popup trigger={<button id="editBtn" onClick={handleEditGame}><img id="editBtnIcon" src={editIcon} alt="Edit Game Button" />Edit game</button>} modal>
                                {close => (<EditGameComponent game={currentGame} edit={close}></EditGameComponent>)}
                            </Popup>
                        </div>
                    </div>
                </div>
                <button id="joinBtn" onClick={handleNewPlayer}>Join game</button>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h3>
                    Error occured my dudes.
                </h3>
            </div>
        )
    }
}

export default GameDetailsPage;
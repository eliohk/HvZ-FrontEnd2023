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

const GameDetailsPage = (props) => {
    const [listView, setListView] = useState("players");
    const allGames = useSelector((state) => state);
    const [editGameView, setEditGameView] = useState(false);
    const [ loading, setLoading ] = useState("");
    const [userJoined, setUserJoined] = useState(false);

    let currentGame = allGames.data.currGame;
    console.log(currentGame)
    let token = keycloak.idTokenParsed.sub;
    let userName = keycloak.tokenParsed.preferred_username
    console.log(currentGame.players)
    let currentPlayer;
    
    if (currentGame.players != undefined && !userJoined){
        loop:
        for (let i = 0; i  < currentGame.players.length; i++){
            if (currentGame.players[i].username === userName || !userJoined){
                currentPlayer = currentGame.players[i]
                setUserJoined(true)
                break loop;
            }
        }
    }
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

    function handleNewPlayer() {
        const playerObj = {
            userTokenRef: keycloak.idTokenParsed.sub,
            gameRef: currentGame.id,
            biteCode: "12345",
            patientZero: false,
            human: true
        };
        dispatch(postPlayer(playerObj))
        setUserJoined(true)

    }

    function handleLeaveGame() {
        const deleteObj = {
            token: token,
            callback: setUserJoined
        }
        dispatch(deletePlayerByToken(deleteObj))
        setUserJoined(false)
    }

    const displayEditGameAdmin = () => {
        if (keycloak.hasRealmRole("ADMIN")) {
            return (
                <Popup trigger={<button id="editBtn" onClick={handleEditGame}><img id="editBtnIcon" src={editIcon} alt="Edit Game Button" />Edit game</button>} modal>
                    {close => (<EditGameComponent game={currentGame} edit={close}></EditGameComponent>)}
                </Popup>

            )

        }

    }


    if (currentGame.id) {
        return (
            <div className="mostMainContainer">
                <div className='mainContainer'>
                    <div className="header">
                        {keycloak.authenticated ? userJoined ? 
                                <button id="leaveBtn" onClick={handleLeaveGame}>Leave game</button>
                                :
                                <button id="joinBtn" onClick={handleNewPlayer}>Join game</button>
                            :
                            <button id="joinBtn" onClick={() => keycloak.login()}>Log in</button>
                        }
                        {keycloak.hasRealmRole("ADMIN") ?
                            <h5 id="removeMargin">Admin</h5>
                            :
                            <h5 id="removeMargin"></h5>
                        }
                        <a href="/" id="retBtn" className="button"><img id="exitIcon" src={retIcon} alt="Return button" /></a>
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


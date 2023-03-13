import "../../css/modal.css";
import 'leaflet/dist/leaflet.css';
import PlayerListComponent from "../../components/playerListComponent/playerListComponent.jsx";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSearchParams  } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import ChatViewComponent from "../../components/chatViewComponent/ChatViewComponent";
import MapComponent from "../../components/mapComponent/MapComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../states/dataSlice";
import SquadListComponent from "../../components/playerListComponent/squadListComponent";
import SquadMemberListComponent from "../../components/playerListComponent/squadMemberListComponent";
import KillsListComponent from "../../components/playerListComponent/killsListComponent";
import BiteCodeComponent from "../../components/playerListComponent/biteCodeComponent";


// TODO: USE REDUX TO POPULATE :))))

const GameDetailsPage = ( props ) => {

    const [ listView, setListView ] = useState("players");

    const allGames = useSelector((state) => state.data.gamesArray);
    const dispatch = useDispatch();

    const handleMessage = () => {
        console.log("Handling message!")
    }

    const handleListView = (event) => {
        setListView(event.target.value);
    }

    const params = window.location.pathname;
    const id = params.split("/")[2];

    const game = props.games[id];

    if (!game) {
        return (
            <div className="container">
                <p> Error occured. fuck ya mum</p>
            </div>
        )
    }

    function getListView(view) {
        if (view == "players") {
            return <PlayerListComponent data={game}/>;
        } else if (view == "squad") {
            return <SquadListComponent data={game}/>;
        } else if (view == "human") {
            return <BiteCodeComponent />
        } else if (view == "zombie") {
            return <KillsListComponent data={game}/>;
        }
    }

    return (
        <div className="mostMainContainer">
            <div className='mainContainer'>
                <div className="header">
                    <h5 id="removeMargin">Administrator</h5>
                    <button id="retBtn">X</button>
                </div>
                <div className="liftToHeader">
                    <h2 id="removeMargin">{game.title}</h2>
                    <h4 id="removeMargin">"{game.gameType}"</h4>
                </div>

                <p id="removeMargin" className="desc">{game.description}</p>
                <div className="secondaryContainer">
                    <div className="interactiveStuffContainer">
                        {/* map + squad list here */}
                        <div className="mapContainer">
                            <MapComponent></MapComponent>
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
                                <form>
                                    <input id="input" type="text" name="name" />
                                    <button id="enterBtn" onClick={handleMessage} type="button">&gt;</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="editDiv">
                        <button id="editBtn">Edit game</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GameDetailsPage;
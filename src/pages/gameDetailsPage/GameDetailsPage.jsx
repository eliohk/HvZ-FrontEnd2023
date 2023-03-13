import "../../css/modal.css";
import 'leaflet/dist/leaflet.css';
import GameListPlayerComponent from "../../components/gameListPlayerComponent/GameListPlayerComponent.jsx";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useEffect, useRef } from 'react'
import ChatViewComponent from "../../components/chatViewComponent/ChatViewComponent";
import MapComponent from "../../components/mapComponent/MapComponent";

// TODO: USE REDUX TO POPULATE :))))

const GameDetailsPage = () => {

    const handleMessage = () => {
        console.log("Handling message!")
    }

    return (
        <div className="mostMainContainer">
            <div className='mainContainer'>
                <div className="header">
                    <h5 id="removeMargin">Administrator</h5>
                    <button id="retBtn">X</button>
                </div>
                <div className="liftToHeader">
                    <h2 id="removeMargin">Kids @ Noroff</h2>
                    <h4 id="removeMargin">"Hide & Seek"</h4>
                </div>

                <p id="removeMargin" className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className="secondaryContainer">
                    <div className="interactiveStuffContainer">
                        {/* map + squad list here */}
                        <div className="mapContainer">
                            <MapComponent></MapComponent>
                        </div>                        
                        <div className="listContainer">
                        <GameListPlayerComponent/>
                        </div>
                    </div>
                    <div className="chatContainer">
                        {/* chatbox + buttons here */}
                        <ChatViewComponent />
                        <div className="buttonContainer">
                            <button className="btns">List of players</button>
                            <button className="btns">Squad list</button>
                            <button className="btns">Human options</button>
                            <button className="btns">Zombie options</button>
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
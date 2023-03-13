import "../../css/modal.css";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import deadIcon from "../../resources/deadIcon.png";
import squadIcon from "../../resources/squadIcon.svg";
import L from 'leaflet';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useEffect, useRef } from 'react'

// TODO: USE REDUX TO POPULATE :))))

const GameDetailsPage = ( ) => {

    var dead = L.icon({
        iconUrl: deadIcon,
        iconSize:     [40, 40], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 85], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const messageRef = useRef();

    useEffect(() => {
        const chat = messageRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    })

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
                            <MapContainer style={{
                                    height: "600px", 
                                    width:"600px", 
                                    minHeight: "100%",
                                    minWidth: "100%",
                                    borderRadius:"32px",
                                }} center={[59.911491, 10.757933]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker 
                                position={[59.911491, 10.757933]}
                                icon={dead}
                                >
                                    <Popup>
                                        Player: Khoi <br/>
                                        Killed by: Stupidity <br/>
                                        Longitude: 59.911491 <br/> 
                                        Latitude: 10.757933
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <div className="listContainer">
                            <h3 id="listTitle"><img src={squadIcon} style={{width:"40px"}} alt="Squad icon" /> Player list</h3>
                            <ul>
                                <li>Adam</li>
                                <li>David</li>
                                <li>Fatima</li>
                                <li>Khoi</li>
                                <li>Mostafa</li>
                                <li>Player</li>
                                <li>Player</li>
                                <li>Player</li>
                                <li>Player</li>
                                <li>Player</li>
                                <li>Player</li>
                                <li>Player</li>
                            </ul>
                        </div>
                    </div>
                    <div className="chatContainer">
                        {/* chatbox + buttons here */}
                            <div className="chatbox" ref={messageRef}>
                                <p className="msg">Adam: I can see 3 zombies at location X. Be careful!</p>
                                <p className="msg">Fatima: Thanks, Adam! Me and Khoi will hide.</p>
                                <p className="selfMsg">Naughty boy: Come at me brah</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">Khoi: Let's do this!</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">You: Thanks Adam, need backup?</p>
                                <p className="msg">Khoi: Let's do this!</p>
                            </div>
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
import PlayerMarker from './PlayerMarker';
import bluePlayerIcon from "../../resources/Player blue.svg"
import DeadMarker from './DeadMarker';
import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup
} 
from "react-leaflet";
import "../../css/modal.css";
import { postCheckIn, setMarkers } from '../../states/dataSlice';
import keycloak from '../../keycloak';



const MapComponent = (props) => {   
    const allGames = useSelector((state) => state);
    const [mapClicked, setMapClicked] = useState(false)
    const [kills, setKills] = useState(props.kills)
    const [currentClickPosition, setCurrentClickPosition] = useState()
    const dispatch = useDispatch();
    const [isPlayer, setIsPlayer] = useState(false)
    const currentGame = allGames.data.currGame;
    const [currPlayer, setPlayer] = useState(null)
    useEffect(() => {
        if (currentGame.players && keycloak.authenticated){
            let found = false
            const userName = keycloak.tokenParsed.preferred_username
            loop:
            for (let i = 0; i  < currentGame.players.length; i++){
                if (currentGame.players[i].username === userName){
                    setPlayer(currentGame.players[i])
                    setIsPlayer(true)
                    found = true
                    break loop;
                }
            }
            if (found === false){
                setIsPlayer(false)
            }
        }

        console.log(currPlayer);
    }, [currentGame])

    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            setMapClicked(true)
            setCurrentClickPosition(e.latlng)
        }
        })
    }
    
    async function handleButtonClick(){
        console.log(currPlayer)
        setMapClicked(false)
        let now = new Date().toLocaleDateString('en-US', { weekday:"long", hour:"numeric", minute:"numeric", hour12: false}).toString();
        
        const checkinObj = {
            id: currPlayer.id,
            lastCheckInTime: now,
            lat: currentClickPosition.lat,
            lng: currentClickPosition.lng
        };

        dispatch(postCheckIn(checkinObj))
    }

    const playerMarkers = currentGame.players.map((item, i) => {
        console.log(item);
        if (item.human && item.lat != undefined){
            return <PlayerMarker key={i} player={item}></PlayerMarker> 
        }
    })

    const killMarkers = currentGame.kills.map((item, i) => {
        return <DeadMarker key={i} kill={item}></DeadMarker>
    })

    
    var checkIn = L.icon({
        iconUrl: bluePlayerIcon,
        iconSize: [40, 40], // size of the icon
    })

    return (
        <div className='mainMapDiv' >
            { isPlayer ? mapClicked ? null : <a className="mapToolTip" href="#" title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Click on the map to assign location, click on the "check in" button to confirm the check in.</span></a> 
                : null}
            { isPlayer ? mapClicked ? <a className="mapBtn" href="#" onClick={handleButtonClick} title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Check-in</span></a> : null
                : null}
            {props.device == "phone" ?
                <MapContainer style={{  
                width:"100%",
                height:"100%",              
                border: "solid white",
                borderWidth: "0.0625rem",
                borderRadius: "0.9375rem",
                cursor: "pointer",
                }} center={[currentGame.lat, currentGame.lng]} zoom={32} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {playerMarkers}
                {killMarkers}
                { isPlayer ? mapClicked ? <Marker 
                        position={[currentClickPosition.lat, currentClickPosition.lng]}
                        icon={checkIn}
                    >
                        <Popup>
                            Player: New position <br />
                            Longitude: {currentClickPosition.lat} <br />
                            Latitude: {currentClickPosition.lng}
                        </Popup>
                    </Marker> : null
                : null}
                
                <LocationMarker></LocationMarker>
                </MapContainer>
                :
                <MapContainer style={{
                height: "28rem",
                width: "37.56rem",
                minHeight: "100%",
                minWidth: "100%",
                
                border: "solid white",
                borderWidth: "0.0625rem",
                borderRadius: "0.9375rem",
                cursor: "pointer",
                }} center={[currentGame.lat, currentGame.lng]} zoom={16} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {playerMarkers}
                {killMarkers}
                { isPlayer ? mapClicked ? <Marker 
                                    position={[currentClickPosition.lat, currentClickPosition.lng]}
                                    icon={checkIn}
                                >
                                    <Popup>
                                        Player: New position <br />
                                        Longitude: {currentClickPosition.lat} <br />
                                        Latitude: {currentClickPosition.lng}
                                    </Popup>
                                </Marker> : null
                            : null}
                
                <LocationMarker></LocationMarker>
                </MapContainer>
            }
            
        </div>  
    )
}

export default MapComponent;
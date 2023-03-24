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
    const [players, setPlayers] = useState(props.players)
    const [kills, setKills] = useState(props.kills)
    const [currentClickPosition, setCurrentClickPosition] = useState()
    const dispatch = useDispatch();
    const [isPlayer, setIsPlayer] = useState(false)
    const currentGame = allGames.data.currGame;
    const userName = keycloak.tokenParsed.preferred_username

    useEffect(() => {
        console.log(currentGame.players)
        if (currentGame.players){
            let found = false
            loop:
            for (let i = 0; i  < currentGame.players.length; i++){
                console.log(currentGame.players[i].username)
                if (currentGame.players[i].username === userName){
                    setIsPlayer(true)
                    found = true
                    break loop;
                }
            }
            if (found === false){
                setIsPlayer(false)
            }
        }
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
        setMapClicked(false)
        let now = new Date().toLocaleDateString('en-US', { weekday:"long", hour:"numeric", minute:"numeric", hour12: false}).toString();
        
        const checkinObj = {
            id: 1,
            lastCheckInTime: now,
            lat: currentClickPosition.lat,
            lng: currentClickPosition.lng
        };

        dispatch(postCheckIn(checkinObj))
    }

    const playerMarkers = players.map((item, i) => {
        if (item.human){
            return <PlayerMarker key={i} player={item}></PlayerMarker> 
        }
    })

    const killMarkers = kills.map((item, i) => {
        return <DeadMarker key={i} kill={item}></DeadMarker>
    })

    useEffect (() => {
        setPlayers(allGames.data.markers);
    }, [allGames.data.markers]);

    
    var checkIn = L.icon({
        iconUrl: bluePlayerIcon,
        iconSize: [40, 40], // size of the icon
    })

    return (
        <div style={{
            height: "28rem",
            width: "37.56rem",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            position: "relative",    
            }} >
            { isPlayer ? mapClicked ? null : <a className="mapToolTip" href="#" title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Click on the map to assign location, click on the "check in" button to confirm the check in.</span></a> 
                : null}
            { isPlayer ? mapClicked ? <a className="mapBtn" href="#" onClick={handleButtonClick} title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Check-in</span></a> : null
                : null}
            <MapContainer style={{
            height: "28rem",
            width: "37.56rem",
            minHeight: "100%",
            minWidth: "100%",
            
            border: "solid black",
            borderRadius: "32px",
            cursor: "pointer",
            }} center={[59.911491, 10.757933]} zoom={13} scrollWheelZoom={false}>
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
        </div>  
    )
}

export default MapComponent;
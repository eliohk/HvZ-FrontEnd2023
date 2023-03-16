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



const MapComponent = (props) => {   
    const allGames = useSelector((state) => state);
    const [mapClicked, setMapClicked] = useState(false)
    const [players, setPlayers] = useState(props.players)
    const [currentClickPosition, setCurrentClickPosition] = useState()
    const dispatch = useDispatch();

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
        return <PlayerMarker key={i} lat={item.lat} lng={item.lng}></PlayerMarker> 
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
            height: "600px",
            width: "600px",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            position: "relative",
            }} >
            { mapClicked ? null : <a className="mapToolTip" href="#" title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Click on the map to assign location, click on the "check in" button to confirm the check in.</span></a>}
            { mapClicked ? <a className="mapBtn" href="#" onClick={handleButtonClick} title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">Check-in</span></a> : null}
            <MapContainer style={{
            height: "600px",
            width: "40%",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            cursor: "pointer",
            }} center={[59.911491, 10.757933]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {playerMarkers}
            { mapClicked ? <Marker 
                                position={[currentClickPosition.lat, currentClickPosition.lng]}
                                icon={checkIn}
                            >
                                <Popup>
                                    Player: New position <br />
                                    Longitude: {currentClickPosition.lat} <br />
                                    Latitude: {currentClickPosition.lng}
                                </Popup>
                            </Marker> : null}
            <DeadMarker lat={59.8} lng={10.8}></DeadMarker>
            <LocationMarker></LocationMarker>
            </MapContainer>
        </div>  
    )
}

export default MapComponent;
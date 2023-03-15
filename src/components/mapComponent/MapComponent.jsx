import PlayerMarker from './PlayerMarker';
import DeadMarker from './DeadMarker';
import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const [players, setPlayers] = useState(props.players)
    const [currentClickPosition, setCurrentClickPosition] = useState()
    const dispatch = useDispatch();

    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            setCurrentClickPosition(e.latlng)
        }
        })
    }
    
    async function handleButtonClick(){
        console.log("BUTTON")
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

    return (
        <div style={{
            height: "600px",
            width: "600px",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            }} >
            {/*<button className='mapBtn' onClick={handleButtonClick}>Hei koie</button>*/}
            <a className="mapBtn" href="#" onClick={handleButtonClick} title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">KNAPP</span></a>
            <MapContainer style={{
            height: "600px",
            width: "40%",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            }} center={[59.911491, 10.757933]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {playerMarkers}
            <DeadMarker lat={59.8} lng={10.8}></DeadMarker>
            <LocationMarker></LocationMarker>
            </MapContainer>
        </div>  
    )
}

export default MapComponent;
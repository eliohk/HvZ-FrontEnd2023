import PlayerMarker from './PlayerMarker';
import DeadMarker from './DeadMarker';
import React from "react";
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup
} 
from "react-leaflet";
import "../../css/modal.css";



const MapComponent = () => {   
    const [currentClickPosition, setCurrentClickPosition] = useState(null)

    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            setCurrentClickPosition(e.latlng)
        }
        })
    }
    
    function handleButtonClick(){
        console.log(currentClickPosition)
    }

    return (
            <MapContainer style={{
            height: "600px",
            width: "600px",
            minHeight: "100%",
            minWidth: "100%",
            borderRadius: "32px",
            }} center={[59.911491, 10.757933]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <PlayerMarker lat={59.911491} lng={10.757933}></PlayerMarker>
            <DeadMarker lat={59.8} lng={10.8}></DeadMarker>
            <LocationMarker></LocationMarker>
            <button className='mapBtn' onClick={handleButtonClick}>Hei koie</button>
            </MapContainer>
    )
}

export default MapComponent;
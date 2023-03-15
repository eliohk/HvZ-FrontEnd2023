import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import "../../css/playerListComponent.css";
import { useState, useEffect } from "react";


const BiteCodeComponent = ( props ) => {
    const [ biteCode, setBiteCode ] = useState(0);

    const handleMessage = (event) => {
        const rand = Math.floor(100000 + Math.random() * 900000);
        setBiteCode(rand);
    }

    return (
        <div className="killContainer">
            <h3 id="biteTitle"> Bite code</h3>
            <input id="bcInput" type="text" name="name" value={biteCode}/>
            <button id="bcGenerator" onClick={handleMessage} type="button">Generate bite code</button>
            <div className="biteMarker">
                <p id="markerLocation">Marker location</p>
                <p id="coordinates">N40° 44.9064', W073° 59.0735'</p>
            </div>
        </div>
    )
}

export default BiteCodeComponent
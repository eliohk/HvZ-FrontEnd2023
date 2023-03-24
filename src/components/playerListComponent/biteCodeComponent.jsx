import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import "../../css/playerListComponent.css";
import { useState, useEffect } from "react";
import keycloak from '../../keycloak';
import { AiOutlineWarning } from 'react-icons/ai';
import Alert from 'react-bootstrap/Alert';

const BiteCodeComponent = ( props ) => {
    const data = useSelector((state) => state);
    const [ bc, setBc ] = useState("");

    useEffect(() => {
        data.data.currGame.players.map((player, i) => {
            if (player.username == keycloak.tokenParsed.preferred_username) {
                console.log("yo?")
                setBc(player.biteCode);
            }
        });
    }, [])

    

    return (
        keycloak.authenticated ?
            <div className="killContainer">
                <h3 id="biteTitle"> Bite code</h3>
                <input id="bcInput" type="text" name="name" value={bc}/>
                <div className="biteMarker">
                    <p id="markerLocation">Marker location</p>
                    <p id="coordinates">N40° 44.9064', W073° 59.0735'</p>
                </div>
            </div>
            :
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", width:"100%"}}>
                <Alert key="danger" variant="danger" className="w-75 h-10">
                    <AiOutlineWarning/> <i> This component has no functionality</i>
                </Alert>                
            </div>
            
        )
}

export default BiteCodeComponent
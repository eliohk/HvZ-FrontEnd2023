import playerIcon from "../../resources/Player.svg";
import L from 'leaflet';
import { Popup, Marker } from 'react-leaflet';


const PlayerMarker = (props) => {

    var player = L.icon({
        iconUrl: playerIcon,
        iconSize: [40, 40],
    })

    return (
        <Marker
            position={[props.player.lat, props.player.lng]}
            icon={player}
        >
            <Popup>
            Squad: {props.player.squad ? props.player.squad.name : "No squad"} <br />
            Last check in: {props.player.lastCheckInTime ? props.player.lastCheckInTime 
                                                            : "No check in yet"} <br />
            Longitude: {props.player.lat} <br />
            Latitude: {props.player.lng}
            </Popup>
        </Marker>
    )
}

export default PlayerMarker;
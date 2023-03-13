import tombstone from "../../resources/tombstone.svg";
import L from 'leaflet';
import { Popup, Marker } from 'react-leaflet';

const DeadMarker = (props) => {
    
    var dead = L.icon({
        iconUrl: tombstone,
        iconSize: [40, 40], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 85], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    return (
        <Marker
            position={[props.lat, props.lng]}
            icon={dead}
        >
            <Popup>
                Player: Khoi <br />
                Killed by: Stupidity <br />
                Longitude: {props.lat} <br />
                Latitude: {props.lng}
            </Popup>
        </Marker>
    )
}

export default DeadMarker;
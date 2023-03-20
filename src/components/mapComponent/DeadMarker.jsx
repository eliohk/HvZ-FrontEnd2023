import tombstone from "../../resources/tombstone.svg";
import L from 'leaflet';
import { Popup, Marker } from 'react-leaflet';

const DeadMarker = (props) => {

    var dead = L.icon({
        iconUrl: tombstone,
        iconSize: [40, 40],
    })

    return (
        <Marker
            position={[props.kill.lat, props.kill.lng]}
            icon={dead}
        >
            <Popup>
                Story: {props.kill.story} <br />
                Time of death: {props.kill.time_of_death} <br />
                Longitude: {props.kill.lat} <br />
                Latitude: {props.kill.lng}
            </Popup>
        </Marker>
    )
}

export default DeadMarker;
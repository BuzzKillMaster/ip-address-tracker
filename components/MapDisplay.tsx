import {MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import {useEffect} from "react";
export default function MapDisplay(props: {
    latitude: number
    longitude: number
}) {
    const hasLocation = props.latitude !== 0 || props.longitude !== 0

    return (
        <MapContainer center={[props.latitude, props.longitude]} zoom={hasLocation ? 10 : 3} scrollWheelZoom={false} zoomControl={false}
                      className={"w-full min-h-[500px] flex-grow z-0"}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hasLocation && <Marker position={[props.latitude, props.longitude]}>
                <Popup>
                    This is the estimated location.
                </Popup>
            </Marker>}
            <ZoomControl position={"bottomleft"}/>
            <AutomaticRecentering latitude={props.latitude} longitude={props.longitude} hasLocation={hasLocation}/>
        </MapContainer>
    )
}

function AutomaticRecentering(props: {
    latitude: number
    longitude: number
    hasLocation: boolean
}) {
    const map = useMap();

    useEffect(() => {
        if (!props.hasLocation) return

        map.setView([props.latitude, props.longitude], 10);
    }, [props.latitude, props.longitude]);

    return null;
}
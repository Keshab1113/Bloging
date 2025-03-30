import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapContainer = ({ lat, lng, zoom }) => {
    const [apiKey, setApiKey] = useState(null);
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lng);

    useEffect(() => {
        setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
        setLatitude(lat);
        setLongitude(lng);
    }, []);
    
    const containerStyle = {
        width: "100%",
        height: "400px",
        borderRadius: "10px",
    };

    const center = {
        lat: latitude,
        lng: longitude,
    };
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom ||10}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
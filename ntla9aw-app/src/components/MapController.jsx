import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapController({ searchLocation }){
    const map = useMap();

    useEffect(()=>{
        searchLocation && map.setView([searchLocation.lat, searchLocation.lng], 8);
    }, [searchLocation, map])

    return null;
}
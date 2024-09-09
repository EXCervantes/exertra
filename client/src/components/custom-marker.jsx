import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RunStick from "../assets/mapMarker.svg";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Make running man not transperent 
const CustomMarker = ({ position, children }) => {
    const map = useMap();
  
    const customIcon = L.icon({
      iconUrl: RunStick,
      iconSize: [40, 40],
      iconAnchor: [25, 50],
    });
  
    return (
      <Marker position={position} icon={customIcon}>
        {children}
      </Marker>
    );
  };
  
  export default CustomMarker;
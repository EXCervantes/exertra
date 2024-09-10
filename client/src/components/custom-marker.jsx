import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RunStick from "../assets/mapMarker2.svg";
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ position, children }) => {
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

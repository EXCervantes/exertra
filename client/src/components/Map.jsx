import { useState } from 'react'
import { MapContainer, Popup, TileLayer, useMapEvents} from 'react-leaflet'
import CustomMarker from './custom-marker'

const Map = () => {
    const LocationMarker = () => {
        const [position, setPosition] = useState(null);
        const map = useMapEvents({
          click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
          },
        });
      
        return position === null? null : (
          <CustomMarker position={position}>
            <Popup>You clicked here</Popup>
          </CustomMarker>
        );
      }
    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMarker position={[51.505, -0.09]}>
                <Popup>
                This is a location
                </Popup>
                </CustomMarker>
                <LocationMarker/>
            </MapContainer>
        </div>
    )
}

export default Map
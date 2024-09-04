import { useState, useEffect } from 'react'
import { MapContainer, Popup, TileLayer, useMap} from 'react-leaflet'
import CustomMarker from './custom-marker'

const Map = () => {
    const LocationMarker = () => {
        const [position, setPosition] = useState(null);

        const map = useMap()
        
        useEffect(() => {
          map.locate().on('locationfound', (e) => {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom());
          }) 
          }, [])
            
        return position === null? null : (
          <CustomMarker position={position}>
            <Popup>You are here!</Popup>
          </CustomMarker>
        );
      }
    return (
        <div>
            <MapContainer center={[48.856614, 2.3522219]} zoom={13} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker/>
            </MapContainer>
        </div>
    )
}

export default Map
import { useState, useEffect } from 'react'
import { MapContainer, Popup, TileLayer, useMap, Polyline} from 'react-leaflet'
import CustomMarker from './custom-marker'
import { Button } from 'flowbite-react'
import tracker from '../lib/tracker'

const Map = () => {
  const [readyRender, setReadyRender] = useState(false)
  const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]); // Mountain in Colorado
  const [zoom, setZoom] = useState(13);
  const [walkingRoute, setWalkingRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);


  useEffect(() => {
    // Get user's current location on page load
    if (!navigator.geolocation) {
      logConsole.textContent = 'Geolocation is not supported by your browser';
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setReadyRender(true)
        setMapCenter([position.coords.latitude, position.coords.longitude])
      })
    }
    // setTimeout(() => {
    //   setReadyRender(true)
    // }, 1000)
  }, []);


  const handleStartTracking = () => {
    if (!isTracking) {
      setIsTracking(true);
      setWatchId(navigator.geolocation.watchPosition((position) => {
        setWalkingRoute((prevRoute) => [...prevRoute, {
          coords: position.coords,
          time: new Date()
        }]);
        setMapCenter([position.coords.latitude, position.coords.longitude])
      }, (error) => {
        console.error(error);
      }, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 2000,
      }));
    } else {
      navigator.geolocation.clearWatch(watchId);
      setIsTracking(false);
    }
  };

  const handleStopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setIsTracking(false);
      // TODO Save the walking route data
      console.log(walkingRoute);
    }
  };

    return (
        <div>
          {/* TODO Fix this */}
          {readyRender && <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                  url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                  maxZoom={19}
                  />
                <Polyline positions={walkingRoute.map(pos => [pos.coords.latitude, pos.coords.longitude])} pathOptions={{color: 'teal'}}/>
                <CustomMarker position={mapCenter}/>
            </MapContainer>}

            <div className='flex flex-row items-center gap-3'>
            <Button gradientMonochrome={'success'} onClick={handleStartTracking}>
              {isTracking? 'Pause' : 'Start'}
            </Button>
            <Button gradientMonochrome={'failure'} onClick={handleStopTracking}>
              Stop
            </Button>
            </div>
        </div>
    )
}

export default Map
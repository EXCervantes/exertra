import { useState, useEffect } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  Polyline,
} from "react-leaflet";
import CustomMarker from "./custom-marker";
import { Button } from "flowbite-react";
import moment from "moment";
// import tracker from "../lib/tracker"; Custom hook for later

const Map = () => {
  const [readyRender, setReadyRender] = useState(false);
  const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]); // Mountain in Colorado
  const [zoom, setZoom] = useState(13);
  const [walkingRoute, setWalkingRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user's current location on page load
    if (!navigator.geolocation) {
      return setError("Geolocation not supported on this device.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          setReadyRender(true);
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setIsLoading(false);
          setError(error.message);
        }
      );
    }
  }, []);

  const handleStartTracking = () => {
    if (!isTracking) {
      setIsTracking(true);
      setWatchId(
        navigator.geolocation.watchPosition(
          (position) => {
            setWalkingRoute((prevRoute) => [
              ...prevRoute,
              {
                coords: position.coords,
                time: new Date(),
              },
            ]);
            setMapCenter([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            setError(error.message);
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 2000,
          }
        )
      );
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
      <div className="flex justify-center md: place-content-center">
        {readyRender && (
          <MapContainer
            style={{ height: "100vh", width: "90%" }}
            center={mapCenter}
            zoom={zoom}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            <Polyline
              positions={walkingRoute.map((pos) => [
                pos.coords.latitude,
                pos.coords.longitude,
              ])}
              pathOptions={{ color: "teal" }}
            />
            <CustomMarker position={mapCenter} />
          </MapContainer>
        )}
      </div>
      <div className="z-20 bottom-10 flex justify-center md: place-content-center gap-3">
        <Button
          gradientMonochrome={"success"}
          onClick={handleStartTracking}
          type="button"
        >
          {isTracking ? "Pause" : "Start"}
        </Button>
        <Button gradientMonochrome={"failure"} onClick={handleStopTracking}>
          Stop
        </Button>
      </div>
    </div>
  );
};

export default Map;

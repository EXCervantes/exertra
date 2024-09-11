import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { Button } from "flowbite-react";
import CustomMarker from "./custom-marker";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import RightNav from "./RightNav";
import geolocationTrackingStats from "../hooks/geolocationTrackingStats";
import useMapActions from "../hooks/useMapActions";

const Map = () => {
  const [readyRender, setReadyRender] = useState(false);
  const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isTracking,
    walkingRoute,
    startTracking,
    stopTracking,
    totalTime,
    totalDistance,
  } = geolocationTrackingStats();

  const { zoom } = useMapActions();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device.");
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

  return (
    <div>
      <div style={{ height: "100%" }}>
        {readyRender && (
          <div id="map-wrapper">
            <MapContainer
              style={{ height: "100vh", width: "100%" }}
              center={mapCenter}
              zoom={zoom}
              scrollWheelZoom={true}
              doubleClickZoom={false}
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
              <RightNav />
              <div
                className="flex flex-col-6 items-center gap-3"
                id="button-wrapper"
              >
                <Button
                  gradientMonochrome={"success"}
                  onClick={startTracking}
                  type="button"
                  id="startBtn"
                >
                  {isTracking ? "Pause" : "Start"}
                </Button>
                <div className="bg-blue-100 border-solid border-gray-400">
                  <div className="drop-shadow-glow">
                    {/* <Stopwatch /> */}
                    <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
                    <br></br>
                    <p>
                      Total Time:{" "}
                      {dayjs
                        .duration(totalTime * 1000, "milliseconds")
                        .format("HH:mm:ss")}
                    </p>
                  </div>
                </div>
                <Button
                  gradientMonochrome={"failure"}
                  onClick={stopTracking}
                  type="button"
                  id="stopBtn"
                >
                  Stop
                </Button>
              </div>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;

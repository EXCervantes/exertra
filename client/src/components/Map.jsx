import { useState, useEffect, Fragment } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import CustomMarker from "./custom-marker";
import { Button } from "flowbite-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { useV2Sidebar } from "react-leaflet-v2-sidebar";
import L from "leaflet";
import RightNav from "./RightNav";
import Stopwatch from "./Stopwatch";
// import metersToMiles from "../utils/distances";
// import tracker from "../lib/tracker"; Custom hook for later

const Map = () => {
  const [readyRender, setReadyRender] = useState(false);
  const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]); // Mountain in Colorado
  const [zoom, setZoom] = useState(16);
  const [walkingRoute, setWalkingRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startDate, setStartDate] = useState(null);

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
      setStartDate(new Date());
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
      calculateUserStatistics();
    }
  };

  const calculateUserStatistics = () => {
    const distance = walkingRoute.reduce((acc, current, index) => {
      if (index === 0) return 0;
      const prevCoords = walkingRoute[index - 1].coords;
      const currentCoords = current.coords;
      const distanceBetweenPoints = getDistanceBetweenPoints(
        prevCoords,
        currentCoords
      );
      return acc + distanceBetweenPoints;
    }, 0);

    const totalTime = (new Date() - startDate) / 1000; // convert to seconds

    setTotalDistance(distance);
    setTotalTime(totalTime);
  };

  const getDistanceBetweenPoints = (point1, point2) => {
    const lat1 = (point1.latitude * Math.PI) / 180;
    const lon1 = (point1.longitude * Math.PI) / 180;
    const lat2 = (point2.latitude * Math.PI) / 180;
    const lon2 = (point2.longitude * Math.PI) / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius = 6371; // Earth's radius in kilometers
    const distance = radius * c;

    return distance * 1000 * 0.000621371; // convert to miles
  };

  // const Sidebar = () => {
  //   const map = useMap();
  //   const panels = [
  //     {
  //       id: "userInfo",
  //       tab: '<i style="font-size: large" class="fa fa-user"></i>',
  //       pane: "User Info Tab Content",
  //       title: "Your Profile",
  //       position: "top",
  //     },
  //     {
  //       id: "settings",
  //       tab: '<i style="font-size: large" class="fa fa-gear"></i>',
  //       pane: "Logout",
  //       title: "Settings",
  //       position: "top",
  //       // button: (e) => {
  //       //   e.target;
  //       // },
  //     },
  //   ];
  //   const configs = [
  //     {
  //       autopan: true,
  //       closeButton: true,
  //       container: "",
  //       position: "right",
  //     },
  //   ];
  //   if (map) {
  //     const sidebar = L.control.sidebar(configs).addTo(map);
  //     panels.map((panel) => sidebar.addPanel(panel));
  //   }

  //   useV2Sidebar(map, panels, configs);

  //   return <Fragment></Fragment>;
  // };

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
              {/* <Sidebar/> */}
              <RightNav />
              <div
                className="flex flex-col-6 items-center gap-3"
                id="button-wrapper"
              >
                <Button
                  gradientMonochrome={"success"}
                  onClick={handleStartTracking}
                  type="button"
                  id="startBtn"
                >
                  {isTracking ? "Pause" : "Start"}
                </Button>
                <div className="bg-blue-100 border-solid border-gray-400">
                  <div className="drop-shadow-glow">
                    <Stopwatch />
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
                  onClick={handleStopTracking}
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

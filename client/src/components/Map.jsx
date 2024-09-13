import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";
import CustomMarker from "./custom-marker";
import RightNav from "./RightNav";
import useMapActions from "../hooks/useMapActions";
import { Button } from "flowbite-react";
import { formatTime } from "../utils/timehelper";

const Map = () => {
  const [readyRender, setReadyRender] = useState(false);
  const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [isReset, setIsReset] = useState(false);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);
  const [walkingRoute, setWalkingRoute] = useState([]);

  const { zoom } = useMapActions();

  useEffect(() => {
    if (walkingRoute.length > 0) {
    }
  }, [walkingRoute]);

  useEffect(() => {
    if (isTracking) {
      const intervalId = setInterval(calculateUserStatistics, 500);
      return () => clearInterval(intervalId);
    }
  }, [isTracking, walkingRoute, startDate]);

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

  const startTracking = () => {
    setIsTracking(true);
    setStartDate(new Date());
    setPausedTime(0);
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setWalkingRoute((prevRoute) => [
          ...prevRoute,
          {
            coords: position.coords,
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
        maximumAge: 5000,
        timeout: 2000,
      }
    );
    setWatchId(id);
  };

  const pauseTracking = () => {
    setIsTracking(false);
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    const currentTime = new Date();
    const pausedTimeDiff = (currentTime - startDate) / 1000;
    setPausedTime(pausedTime + pausedTimeDiff);
  };

  const resumeTracking = () => {
    setIsTracking(true);
    setStartDate(new Date());

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setWalkingRoute((prevRoute) => [
          ...prevRoute,
          {
            coords: position.coords,
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
        maximumAge: 5000,
        timeout: 2000,
      }
    );
    setWatchId(id);
  };

  const calculateUserStatistics = () => {
    const currentTime = new Date();
    const totalTime = (currentTime - startDate) / 1000 + pausedTime;
    const distance = walkingRoute.reduce((acc, current, index) => {
      if (index === 0) return acc;
      const prevCoords = walkingRoute[index - 1].coords;
      const currentCoords = current.coords;
      const distanceBetweenPoints = getDistanceBetweenPoints(
        prevCoords,
        currentCoords
      );
      return acc + distanceBetweenPoints;
    }, 0);

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
    const radius = 6371;
    const distance = radius * c;

    return distance * 1000 * 0.000621371; // convert to miles
  };

  const saveWorkout = async () => {
    try {
      const { data } = await addWorkout({
        variables: {
          distance: totalDistance,
          time: totalTime,
        },
      });
      console.log("Workout saved:", data.addWorkout);
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
      calculateUserStatistics();
      saveWorkout();
      setIsReset(true);
    }
  };

  const resetTracking = () => {
    setTotalDistance(0);
    setTotalTime(0);
    setWalkingRoute([]);
    setStartDate(null);
    setIsReset(false);
  };

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
              {true && (
                <Polyline
                  key={walkingRoute.length}
                  positions={walkingRoute.map((pos) => [
                    pos.coords.latitude,
                    pos.coords.longitude,
                  ])}
                  pathOptions={{ color: "teal" }}
                />
              )}
              <CustomMarker position={mapCenter} />
              <RightNav />
              <div
                className="flex justify-center items-center mr-12 mt-10"
                id="button-wrapper"
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div
                    className="max-w-xl mx-auto bg-slate-50 overflow-hidden shadow-lg"
                    id="custom-container"
                  >
                    <div className="px-6 py-4">
                      <div className="text-center" id="stopwatch-stats">
                        <span
                          className="block sm:inline pr-1 text-xl"
                          id="time-text"
                        >
                          time
                        </span>
                        <span
                          className="block sm:inline text-4xl pr-2"
                          id="time-val"
                        >
                          {formatTime(totalTime)}
                        </span>
                        <span
                          className="block sm:inline pr-1 text-xl"
                          id="distance-text"
                        >
                          distance
                        </span>
                        <span
                          className="block sm:inline text-4xl"
                          id="distance-val"
                        >
                          {totalDistance.toFixed(2)}
                        </span>
                        <span
                          className="block sm:inline pl-1 text-xl"
                          id="distance-mi"
                        >
                          mi
                        </span>
                      </div>
                      <div className="gap-6 mt-6 flex flex-col sm:flex-row justify-center">
                        <Button
                          gradientMonochrome={"success"}
                          className="hover:bg-green-700
                     text-white font-bold py-2 px-4 sm:mr-2"
                          type="button"
                          onClick={isTracking ? pauseTracking : startTracking}
                          id="startBtn"
                        >
                          {isTracking ? "Pause" : "Start"}
                        </Button>
                        <Button
                          gradientMonochrome={"failure"}
                          onClick={isReset ? resetTracking : stopTracking}
                          type="button"
                          className="hover:bg-red-700
                     text-white font-bold py-2 px-4"
                          id={isReset ? "resetBtn" : "stopBtn"}
                        >
                          {isReset ? "Reset" : "Stop"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;

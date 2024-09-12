import { useEffect } from "react";
import { Button } from "flowbite-react";
import { formatTime } from "../utils/timehelper";
import geolocationTrackingStats from "../hooks/geolocationTrackingStats";

const Stopwatch = () => {
  const {
    isTracking,
    walkingRoute,
    startDate,
    pauseTracking,
    startTracking,
    isReset,
    resetTracking,
    stopTracking,
    totalTime,
    totalDistance,
    calculateUserStatistics,
  } = geolocationTrackingStats();

  useEffect(() => {
    if (isTracking) {
      const intervalId = setInterval(calculateUserStatistics, 500);
      return () => clearInterval(intervalId);
    }
  }, [isTracking, walkingRoute, startDate]);

  return (
    <div className="flex justify-center items-center mt-10" id="button-wrapper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-xl mx-auto bg-slate-50
         overflow-hidden shadow-lg"
          id="custom-container"
        >
          <div className="px-6 py-4">
            <div className="text-center" id="stopwatch-stats">
              <span className="pr-1 text-xl" id="time-text">
                time
              </span>
              <span className="text-4xl pr-2" id="time-val">
                {formatTime(totalTime)}
              </span>
              <span className="pr-1 text-xl" id="distance-text">
                distance
              </span>
              <span className="text-4xl" id="distance-val">
                {totalDistance.toFixed(2)}
              </span>
              <span className="pl-1 text-xl" id="distance-mi">
                mi
              </span>
            </div>
            <div className="gap-6 mt-6 flex justify-center">
              <Button
                gradientMonochrome={"success"}
                className="hover:bg-green-700
                     text-white font-bold py-2 px-4 mr-2"
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
  );
};

export default Stopwatch;

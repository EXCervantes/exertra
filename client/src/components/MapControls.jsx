// import Stopwatch from "./Stopwatch";
import { formatTime } from "../utils/timeUtils";

const MapControls = ({
  isTracking,
  startTracking,
  stopTracking,
  totalDistance,
  totalTime,
}) => {
  return (
    <div className="flex flex-col-6 items-center gap-3" id="button-wrapper">
      <Button gradientMonochrome={"success"} onClick={startTracking}>
        {isTracking ? "Pause" : "Start"}
      </Button>
      <div className="bg-blue-100 border-solid border-gray-400">
        <div className="drop-shadow-glow">
          {/* <Stopwatch /> */}
          <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
          <br></br>
          <p>Total Time: {formatTime(totalTime)}</p>
        </div>
      </div>
      <Button gradientMonochrome={"failure"} onClick={stopTracking}>
        Stop
      </Button>
    </div>
  );
};

export default MapControls;

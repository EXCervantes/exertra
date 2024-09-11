const Stopwatch = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-white text-2xl font-bold font-serif rounded p-3"
        id="stopwatch"
      >
        <span>
          <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
          <br></br>
          <p>
            Total Time:{" "}
            {dayjs
              .duration(totalTime * 1000, "milliseconds")
              .format("HH:mm:ss")}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Stopwatch;

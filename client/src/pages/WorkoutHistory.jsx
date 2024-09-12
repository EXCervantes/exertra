import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

const Workouts = () => {
  const [userId] = useState(localStorage.getItem("userId"));
  const { loading, error, data } = useQuery(GET_WORKOUT, {
    variables: { userId },
  });

  if (!workouts.length) {
    return <h3>No Workouts Yet</h3>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Past Workouts</h2>
      <div className="space-y-4">
        {data.getWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="p-4 bg-gray-700 text-white rounded-lg shadow-lg"
          >
            <h3 className="text-xl">Workout</h3>
            <p>Distance: {activity.distance} miles</p>
            <p>Duration: {activity.duration} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;

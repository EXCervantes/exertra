import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

const Workouts = () => {
  const [userId] = useState(localStorage.getItem("userId"));
  const { loading, error, data } = useQuery(GET_WORKOUT, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Your Workouts</h2>
      <div className="space-y-4">
        {data.getWorkouts.map((activity) => (
          <div
            key={activity.id}
            className="p-4 bg-gray-700 text-white rounded-lg shadow-lg"
          >
            <h3 className="text-xl">{activity.type.toUpperCase()}</h3>
            <p>Distance: {activity.distance} km</p>
            <p>Duration: {activity.duration} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;

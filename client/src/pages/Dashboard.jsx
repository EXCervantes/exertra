import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { formatTime } from "../utils/timehelper";

import Auth from "../utils/auth";

const Dashboard = () => {
  const username = Auth.getProfile().authenticatedPerson?.username;
  if (!username) {
    return <Navigate to="/login" />;
  }

  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Welcome {`${username}!`}</h2>
      <div className="space-y-4">
        {data.me.workouts.map((workout) => (
          <div
            key={workout._id}
            className="p-4 bg-gray-700 text-white rounded-lg shadow-lg"
          >
            <h3 className="text-xl">Workout</h3>
            <p>Distance: {workout.distance.toFixed(2)} miles</p>
            <p>Duration: {formatTime(workout.time)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

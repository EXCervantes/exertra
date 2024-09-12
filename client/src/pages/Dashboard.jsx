import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { formatTime } from "../utils/timehelper";
import { FaRunning } from "react-icons/fa";

import Auth from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME, {
    skip: !Auth.loggedIn(),
  });
  // const username = Auth.getProfile().authenticatedPerson?.username;
  const user = data?.me || data?.user || {};

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.workouts?.length) {
    return (
      <div className="flex flex-col items-center text-center mt-10">
        <h3 className="text-xl font-bold mb-4">
          No workouts here yet...
          <br />
          Let's go for a jog!
        </h3>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          To The Map!
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Welcome {`${user.username}!`}</h2>
      <div className="space-y-4">
        {user.workouts.map((workout) => (
          <div
            key={workout._id}
            className="p-4 bg-gray-700 text-white rounded-lg shadow-lg"
          >
            <h3 className="text-xl">Workout</h3>
            <p>Distance: {workout.distance.toFixed} miles</p>
            <p>Duration: {formatTime(workout.time)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

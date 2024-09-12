import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { formatTime } from "../utils/timehelper";

import Auth from "../utils/auth";
import MapButton from "../components/MapButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME, {
    skip: !Auth.loggedIn(),
  });

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
        <MapButton />
      </div>
    );
  }

  return (
    <div className="p-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      <h2 className="text-3xl mb-6 font-semibold text-center">
        Welcome {`${user.username}!`}
      </h2>
      <div className="mb-6">
        <MapButton />
      </div>
      <div className="text-2xl text-center mb-3">
        <h3>Your Past Workouts</h3>
      </div>
      <div className="pt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {user.workouts.map((workout) => (
          <div
            key={workout._id}
            className="max-w-sm mx-auto bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="px-6 py-4 border-b border-light-secondary dark:border-dark-secondary">
              <h3 className="text-xl font-semibold">Workout</h3>
            </div>

            <div className="px-6 py-4">
              <p className="text-lg font-medium">
                <span className="font-semibold">Distance:</span>{" "}
                {workout.distance.toFixed(2)} miles
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Duration:</span>{" "}
                {formatTime(workout.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

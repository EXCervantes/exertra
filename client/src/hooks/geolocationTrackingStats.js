import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { GET_USER } from "../utils/queries";
import { ADD_WORKOUT } from "../utils/mutations";
import Auth from "../utils/auth";


const geolocationTrackingStats = () => {
    const [mapCenter, setMapCenter] = useState([39.192686, -105.333709]);
    const [isTracking, setIsTracking] = useState(false);
    const [watchId, setWatchId] = useState(null);
    const [setError] = useState("");
    const [walkingRoute, setWalkingRoute] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0)

    const [addWorkout, { error }] = useMutation(ADD_WORKOUT);
    // const { loading, data } = useQuery(GET_USER)

    const startTracking = () => {
        setIsTracking(true);
        setStartDate(new Date());
        const id = navigator.geolocation.watchPosition(
            (position) => {
                setWalkingRoute((prevRoute) => [
                    ...prevRoute,
                    {
                        coords: position.coords
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
        );
        setWatchId(id);
    };

    const calculateUserStatistics = () => {
        const distance = walkingRoute.reduce((acc, current, index) => {
            if (index === 0) return acc;
            const prevCoords = walkingRoute[index - 1].coords;
            const currentCoords = current.coords;
            const distanceBetweenPoints = getDistanceBetweenPoints(
                prevCoords,
                currentCoords
            )
            return acc + distanceBetweenPoints;
        }, 0);

        const totalTime = (new Date() - startDate) / 1000;

        setTotalDistance(distance)
        setTotalTime(totalTime)
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
        // const token = Auth.loggedIn() ? Auth.getToken() : null;
        // if (!token) {
        //     return false;
        // }

        try {
            console.log("i am here")
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
            setIsTracking(false);
            calculateUserStatistics()
            saveWorkout()
        }
    };

    return {
        mapCenter,
        isTracking,
        walkingRoute,
        error,
        startTracking,
        stopTracking,
        startDate,
        totalDistance,
        totalTime
    };
};

export default geolocationTrackingStats;
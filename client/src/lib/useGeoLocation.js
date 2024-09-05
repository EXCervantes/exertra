import { useEffect, useState } from "react";

const useGeoLocation = () => {
    const HIGH_ACCURACY = true;
    const MAX_CACHE_AGE_MILLISECOND = 30000;
    const MAX_NEW_POSITION_MILLISECOND = 2000;

    const trackOptions = {
        enableHighAccuracy: HIGH_ACCURACY,
        maximumAge: MAX_CACHE_AGE_MILLISECOND,
        timeout: MAX_NEW_POSITION_MILLISECOND,
    };

    const beginTracking = () => {
        if (!navigator.geolocation) {
            logConsole.textContent = 'Geolocation is not supported by your browser';
        } else {
            logConsole.textContent = 'Locating ...';
            distanceBox.textContent = '0.000';

            return navigator.geolocation.watchPosition(success, error, trackOptions);
        }
    }
};

export default useGeoLocation

// Delete this

export const getDistanceBetweenPoints = (point1, point2) => {
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
    const radius = 6371; // Earth's radius in kilometers
    const distance = radius * c;

    return distance * 1000 * 0.000621371; // convert to miles
};

import { useState } from "react";

const useMapActions = () => {
    const [zoom, setZoom] = useState(16);

    const zoomIn = () => setZoom((prev) => Math.min(prev + 1, 19));
    const zoomOut = () => setZoom((prev) => Math.max(prev - 1, 0));

    return {
        zoom,
        zoomIn,
        zoomOut,
    };
};

export default useMapActions;

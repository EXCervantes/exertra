// Delete this?
import React, { useState, useRef } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customMarkerUserPos } from "./CustomMarker";

const CustomPolyline = () => {
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 39.173684, lng: -94.788134 });
  const [map, setMap] = useState(null);

  const pos = [
    [39.173684, -94.788134], // Trailhead start
    [39.173696, -94.788107],
    [39.173758, -94.788016],
    [39.173834, -94.787955],
    [39.173894, -94.787889],
    [39.173932, -94.787749],
    [39.173929, -94.787638],
    [39.173952, -94.787602],
    [39.173991, -94.787535],
    [39.174076, -94.787498],
    [39.174127, -94.787476], // Run end
  ];

  return (
    <div>
      <MapContainer
        style={{ height: "480px", width: "100%" }}
        zoom={6}
        center={center}
        ref={mapRef}
        whenReady={setMap}
        scrollWheelZoom={true}
      >
        <FeatureGroup>
          {pos?.map((mark, i) => (
            <Marker key={i} position={mark} icon={customMarkerUserPos} />
          ))}

          <Polyline positions={pos} color="red" />
        </FeatureGroup>

        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default CustomPolyline;

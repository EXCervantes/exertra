import React, { useState, useRef } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  TileLayer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customMarkerUserPos } from "./CustomMarker";

const CustomPolyline = () => {
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 36.460353, lng: 126.440674 });
  const [map, setMap] = useState(null);

  const pos = [
    [36.460353, 126.440674],
    [34.789594, 135.438084], //to jpn
    [36.460353, 126.440674],
    [55.410343, 37.902312], //to rus
    [36.460353, 126.440674],
    [40.085148, 116.552407] //to chi
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

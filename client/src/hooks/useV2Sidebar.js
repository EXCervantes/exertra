import L from "leaflet";
import "leaflet-sidebar-v2";
// import "https://unpkg.com/leaflet-sidebar-v2@1.0.0/css/leaflet-sidebar.min.css";

export default function useV2Sidebar(
    map = L.Map,
    panels = [],
    configs = {
        autopan: true,
        closeButton: true,
        container: "",
        position: "right",
    }
) {
    if (map) {
        const sidebar = L.control.sidebar(configs).addTo(map);
        panels.map((panel) => sidebar.addPanel(panel));
    }
}
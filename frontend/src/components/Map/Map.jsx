import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";

// TODO: Obfuscate mapbox api credential
mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9kY2FyZGVuYXMiLCJhIjoiY2tkYnVkenBtMHF1ZDJxbDA5MzF6amZldSJ9.rCPyUZhzPVjIrOQuPB0ppQ";

import "./Modal.css";

// TODO: Add transition

const Map = (props) => {
  const mapContainer = useRef(null);

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/mapbox/streets-v11",
  });
  map.addControl(new mapboxgl.NavigationControl());

  return <div ref={mapContainer}></div>;
};

export default Map;

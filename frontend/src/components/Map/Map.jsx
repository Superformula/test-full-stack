import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

// TODO: Obfuscate mapbox api credential
// TODO: Implement AWS Lambda to search location information. Ask project owner which information is needed.

const MAP_BOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const ACCESS_TOKEN =
  "pk.eyJ1Ijoicm9kY2FyZGVuYXMiLCJhIjoiY2tkYnVkenBtMHF1ZDJxbDA5MzF6amZldSJ9.rCPyUZhzPVjIrOQuPB0ppQ";

const Map = (props) => {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(props.address ? props.address : null);
  const [mapInfo, setMapInfo] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;

    const makeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 5,
        center: [50, 50],
      });

      map.on("load", () => {
        map.addControl(new mapboxgl.NavigationControl());
        map.resize();
        setMap(map);
      });
    };
    if (!map) makeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    const getMapInfo = async () => {
      const response = await fetch(
        MAP_BOX_API_URL + props.address + ".json?access_token=" + ACCESS_TOKEN
      );

      const data = await response.json();
      setMapInfo(data);
      if (map) {
        map.flyTo({ center: data.features[0].center });
      }
    };

    if (props.address) {
      getMapInfo();
    }
  }, [props.address, map]);

  return (
    <div
      style={{ width: "518px", height: "336px" }}
      ref={(el) => (mapContainer.current = el)}
    />
  );
};

export default Map;

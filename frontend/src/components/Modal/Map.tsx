/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapLoadEvent, InteractiveMap } from 'react-map-gl';
import MapboxGL from 'mapbox-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const STYLE = process.env.REACT_APP_MAPBOX_STYLE;

const Map: React.FC = () => {
  const latitude = 45;
  const longitude = -75;

  const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: -75,
    bearing: 0,
    pitch: 0,
    zoom: 10,
  });

  const [map, setMap] = useState<MapboxGL.Map>();
  const onMapLoad = useCallback((event: MapLoadEvent) => setMap(event.target), []);
  const marker = useMemo(() => new MapboxGL.Marker(), []);

  useEffect(() => {
    if (map && latitude && longitude) {
      marker.setLngLat({ lat: latitude, lng: longitude }).addTo(map);
      setViewport((v) => ({ ...v, latitude, longitude }));
    }
  }, [latitude, longitude, map, marker]);

  return (
    <InteractiveMap
      width="500px"
      height="300px"
      zoom={viewport.zoom}
      mapStyle={STYLE}
      latitude={viewport.latitude}
      pitch={viewport.pitch}
      longitude={viewport.longitude}
      mapboxApiAccessToken={TOKEN}
      bearing={viewport.bearing}
      onLoad={onMapLoad}
      onViewportChange={setViewport}
    />
  );
};

export default Map;
